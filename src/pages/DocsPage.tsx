import { useEffect, useMemo } from 'react';
import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import { useLocation } from 'react-router-dom';

import browserCollections from 'collections/browser';
import type { Root } from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';

import { useMDXComponents } from '../components/docs/mdx';
import { getDocsLayoutOptions } from '../lib/docsLayout';
import DocsNotFoundPage from './DocsNotFoundPage';

const docsTree: Root = {
  name: 'Hyperstruck Docs',
  children: [
    {
      type: 'page',
      name: 'Welcome',
      url: '/docs',
    },
    {
      type: 'page',
      name: 'Quickstart',
      url: '/docs/quickstart',
    },
    {
      type: 'folder',
      name: 'Concepts',
      icon: <PsychologyAltRoundedIcon fontSize="small" />,
      defaultOpen: true,
      children: [
        {
          type: 'page',
          name: 'Reasoning',
          url: '/docs/reasoning',
        },
        {
          type: 'page',
          name: 'Learning',
          url: '/docs/learning',
        },
      ],
    },
    {
      type: 'folder',
      name: 'API',
      icon: <ApiRoundedIcon fontSize="small" />,
      defaultOpen: true,
      children: [
        {
          type: 'page',
          name: 'Credentials API',
          url: '/docs/credentials-api',
        },
        {
          type: 'page',
          name: 'Agents API',
          url: '/docs/agents-api',
        },
        {
          type: 'page',
          name: 'Learnings API',
          url: '/docs/learnings-api',
        },
        {
          type: 'page',
          name: 'Usage API',
          url: '/docs/usage-api',
        },
      ],
    },
    {
      type: 'folder',
      name: 'Integrations',
      icon: <TerminalRoundedIcon fontSize="small" />,
      defaultOpen: true,
      children: [
        {
          type: 'page',
          name: 'Claude Skills',
          url: '/docs/claude-skills',
        },
      ],
    },
  ],
};

interface DocsMetaProps {
  title: string;
  description?: string;
}

function DocsMeta({ title, description }: DocsMetaProps) {
  useEffect(() => {
    document.title = `${title} | Hyperstruck Docs`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }
  }, [description, title]);

  return null;
}

const clientLoader = browserCollections.docs.createClientLoader({
  component({ default: Mdx, frontmatter, toc }) {
    return (
      <>
        <DocsMeta title={frontmatter.title} description={frontmatter.description} />
        <DocsPage
          toc={toc}
          tableOfContent={{
            enabled: true,
            style: 'clerk',
            list: {
              thumbBox: true,
            },
            header: (
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-fd-muted-foreground)]">
                On this page
              </div>
            ),
          }}
          tableOfContentPopover={{
            enabled: true,
            style: 'clerk',
            list: {
              thumbBox: true,
            },
          }}
        >
          <DocsTitle>{frontmatter.title}</DocsTitle>
          <DocsDescription>{frontmatter.description}</DocsDescription>
          <DocsBody>
            <Mdx components={useMDXComponents()} />
          </DocsBody>
        </DocsPage>
      </>
    );
  },
});

function DocsPageFallback() {
  useEffect(() => {
    document.title = 'Hyperstruck Docs';
  }, []);

  return (
    <DocsPage tableOfContent={{ enabled: false }}>
      <DocsTitle>Docs are loading</DocsTitle>
      <DocsDescription>Preparing the Hyperstruck documentation experience.</DocsDescription>
      <DocsBody>
        <p>Please refresh the page if this placeholder does not disappear after a moment.</p>
      </DocsBody>
    </DocsPage>
  );
}

function resolveDocEntry(pathname: string): string | null {
  const availableEntries = Object.keys(browserCollections.docs.raw).map((entry) =>
    entry.startsWith('./') ? entry.slice(2) : entry,
  );
  const normalizedPath = pathname.replace(/^\/docs\/?/, '').replace(/\/+$/, '');
  const candidates =
    normalizedPath.length === 0
      ? ['index.mdx', 'index.md']
      : [
          `${normalizedPath}.mdx`,
          `${normalizedPath}.md`,
          `${normalizedPath}/index.mdx`,
          `${normalizedPath}/index.md`,
        ];

  for (const candidate of candidates) {
    const match = availableEntries.find(
      (entry) => entry === candidate || entry.endsWith(`/${candidate}`),
    );

    if (match) {
      return match;
    }
  }

  return null;
}

export default function DocsPageRoute() {
  const { pathname } = useLocation();
  const path = useMemo(() => resolveDocEntry(pathname), [pathname]);

  return (
    <DocsLayout {...getDocsLayoutOptions()} tree={docsTree}>
      {path ? clientLoader.useContent(path) ?? <DocsPageFallback /> : <DocsNotFoundPage />}
    </DocsLayout>
  );
}
