import { type ReactNode, createElement, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import browserCollections from 'collections/browser';
import type { Node, Root } from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';

import { useMDXComponents } from '../components/docs/mdx';
import { getBlogLayoutOptions } from '../lib/blogLayout';
import { buildContentTree, formatDate, resolveContentEntry } from '../lib/contentFiles';
import BlogHomePage from './BlogHomePage';
import BlogNotFoundPage from './BlogNotFoundPage';

interface BlogFrontmatter {
  title?: string;
  description?: string;
  date?: string;
}

interface BlogMetaProps {
  title: string;
  description?: string;
}

const blogFrontmatters = import.meta.glob('../../content/blog/**/*.{md,mdx}', {
  query: {
    collection: 'blog',
  },
  import: 'frontmatter',
}) as Record<string, () => Promise<BlogFrontmatter>>;

function BlogMeta({ title, description }: BlogMetaProps) {
  useEffect(() => {
    document.title = `${title} | Hyperstruck Blog`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }
  }, [description, title]);

  return null;
}

const clientLoader = browserCollections.blog.createClientLoader({
  component({ default: Mdx, frontmatter, toc }) {
    return (
      <>
        <BlogMeta title={frontmatter.title} description={frontmatter.description} />
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
          {frontmatter.date && (
            <div className="mb-6 text-sm text-[var(--color-fd-muted-foreground)]">
              {formatDate(frontmatter.date)}
            </div>
          )}
          <DocsBody>
            <Mdx components={useMDXComponents()} />
          </DocsBody>
        </DocsPage>
      </>
    );
  },
});

function BlogPageFallback() {
  useEffect(() => {
    document.title = 'Hyperstruck Blog';
  }, []);

  return (
    <DocsPage tableOfContent={{ enabled: false }}>
      <DocsTitle>Blog is loading</DocsTitle>
      <DocsDescription>Preparing the Hyperstruck blog experience.</DocsDescription>
      <DocsBody>
        <p>Please refresh the page if this placeholder does not disappear after a moment.</p>
      </DocsBody>
    </DocsPage>
  );
}

function sidebarNameWithDate(name: ReactNode, description: ReactNode): ReactNode {
  if (!description) {
    return name;
  }

  return createElement(
    'span',
    { className: 'flex flex-col gap-0.5' },
    createElement('span', null, name),
    createElement(
      'span',
      { className: 'text-[11px] text-[var(--color-fd-muted-foreground)] font-normal' },
      description,
    ),
  );
}

function addDatesToTree(nodes: Node[]): Node[] {
  return nodes.map((node) => {
    if (node.type === 'page' && node.description) {
      return { ...node, name: sidebarNameWithDate(node.name, node.description) };
    }

    if (node.type === 'folder') {
      return { ...node, children: addDatesToTree(node.children) };
    }

    return node;
  });
}

function useBlogTree(): Root {
  const [tree, setTree] = useState<Root>({
    name: 'Hyperstruck Blog',
    children: [],
  });

  useEffect(() => {
    let isActive = true;

    async function loadTree(): Promise<void> {
      const entries = await Promise.all(
        Object.entries(blogFrontmatters).map(async ([filePath, loadFrontmatter]) => [
          filePath,
          await loadFrontmatter(),
        ]),
      );

      if (!isActive) {
        return;
      }

      const baseTree = buildContentTree(Object.fromEntries(entries), {
        baseUrl: '/blog',
        contentRoot: 'content/blog',
        rootName: 'Hyperstruck Blog',
      });

      setTree({
        ...baseTree,
        children: addDatesToTree(baseTree.children),
      });
    }

    void loadTree();

    return () => {
      isActive = false;
    };
  }, []);

  return tree;
}

export default function BlogPageRoute() {
  const { pathname } = useLocation();
  const tree = useBlogTree();
  const isBlogRoot = pathname.replace(/\/+$/, '') === '/blog';
  const path = useMemo(
    () =>
      isBlogRoot
        ? null
        : resolveContentEntry(pathname, '/blog', browserCollections.blog.raw),
    [isBlogRoot, pathname],
  );

  return (
    <DocsLayout {...getBlogLayoutOptions()} tree={tree}>
      {isBlogRoot ? (
        <BlogHomePage />
      ) : path ? (
        clientLoader.useContent(path) ?? <BlogPageFallback />
      ) : (
        <BlogNotFoundPage />
      )}
    </DocsLayout>
  );
}
