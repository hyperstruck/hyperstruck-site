import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SearchItemType,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';

interface SearchEntry {
  title: string;
  description?: string;
  breadcrumbs?: string[];
  content: string;
  url: string;
  keywords?: string;
}

interface StaticSearchDialogProps extends SharedProps {
  links?: Array<[string, string]>;
  source?: string;
}

function scoreEntry(entry: SearchEntry, query: string): number {
  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery.length === 0) {
    return 0;
  }

  const title = entry.title.toLowerCase();
  const description = entry.description?.toLowerCase() ?? '';
  const keywords = entry.keywords?.toLowerCase() ?? '';
  const content = entry.content.toLowerCase();

  let score = 0;

  if (title.includes(normalizedQuery)) score += 12;
  if (description.includes(normalizedQuery)) score += 8;
  if (keywords.includes(normalizedQuery)) score += 6;
  if (content.includes(normalizedQuery)) score += 3;

  return score;
}

function createActionItem(
  id: string,
  title: string,
  url: string,
  onSelect: () => void,
  description?: string,
): SearchItemType {
  return {
    type: 'action',
    id,
    onSelect,
    node: (
      <div className="flex flex-col items-start gap-1 text-left">
        <span className="font-medium text-[var(--color-fd-foreground)]">{title}</span>
        {description ? (
          <span className="line-clamp-2 text-sm text-[var(--color-fd-muted-foreground)]">
            {description}
          </span>
        ) : null}
      </div>
    ),
  };
}

export default function StaticSearchDialog({
  open,
  onOpenChange,
  links = [],
  source = '/docs-search.json',
}: StaticSearchDialogProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open || entries !== null) {
      return;
    }

    let cancelled = false;

    async function loadEntries(): Promise<void> {
      try {
        setIsLoading(true);
        const response = await fetch(source);
        const data = (await response.json()) as SearchEntry[];

        if (!cancelled) {
          setEntries(data);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void loadEntries();

    return () => {
      cancelled = true;
    };
  }, [entries, open, source]);

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const items = useMemo(() => {
    const handleSelect = (url: string) => {
      onOpenChange(false);
      navigate(url);
    };

    if (search.trim().length === 0) {
      return links.map(([title, url]) =>
        createActionItem(url, title, url, () => handleSelect(url)),
      );
    }

    if (!entries) {
      return null;
    }

    return entries
      .map((entry) => ({
        entry,
        score: scoreEntry(entry, search),
      }))
      .filter((entry) => entry.score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 8)
      .map(({ entry }) =>
        createActionItem(
          entry.url,
          entry.title,
          entry.url,
          () => handleSelect(entry.url),
          entry.description,
        ),
      );
  }, [entries, links, navigate, onOpenChange, search]);

  return (
    <SearchDialog
      open={open}
      onOpenChange={onOpenChange}
      search={search}
      onSearchChange={setSearch}
      isLoading={isLoading}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
