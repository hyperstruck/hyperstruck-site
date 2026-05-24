import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { DocsBody, DocsPage } from 'fumadocs-ui/layouts/docs/page';

import { formatDate } from '../lib/contentFiles';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
}

interface BlogFrontmatter {
  title?: string;
  description?: string;
  date?: string;
}

const blogFrontmatters = import.meta.glob('../../content/blog/**/*.{md,mdx}', {
  query: {
    collection: 'blog',
  },
  import: 'frontmatter',
}) as Record<string, () => Promise<BlogFrontmatter>>;

function slugFromPath(filePath: string): string {
  const match = filePath.match(/content\/blog\/(.+)\.mdx?$/);

  return match ? match[1] : filePath;
}

export default function BlogHomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    document.title = 'Blog | Hyperstruck';

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Engineering insights on building AI agents that learn. From the Hyperstruck team.',
      );
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    async function loadPosts(): Promise<void> {
      const entries = await Promise.all(
        Object.entries(blogFrontmatters).map(async ([filePath, loadFrontmatter]) => {
          const frontmatter = await loadFrontmatter();

          return {
            slug: slugFromPath(filePath),
            title: frontmatter.title ?? 'Untitled',
            description: frontmatter.description ?? '',
            date: frontmatter.date ?? '',
          };
        }),
      );

      if (!isActive) {
        return;
      }

      entries.sort((a, b) => b.date.localeCompare(a.date));
      setPosts(entries);
    }

    void loadPosts();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <DocsPage tableOfContent={{ enabled: false }}>
      <DocsBody>
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Blog</h1>
          <p className="mt-2 text-[var(--color-fd-muted-foreground)]">
            Engineering insights on building AI agents that learn.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <RouterLink
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block rounded-lg border border-[var(--color-fd-border)] p-5 no-underline transition-colors hover:border-[var(--color-fd-primary)] hover:bg-[var(--color-fd-accent)]"
            >
              <div className="mb-1.5 text-xs font-medium text-[var(--color-fd-muted-foreground)]">
                {post.date ? formatDate(post.date) : ''}
              </div>
              <h2 className="mb-1.5 text-lg font-semibold text-[var(--color-fd-foreground)] group-hover:text-[var(--color-fd-primary)]">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--color-fd-muted-foreground)]">
                {post.description}
              </p>
            </RouterLink>
          ))}
        </div>
      </DocsBody>
    </DocsPage>
  );
}
