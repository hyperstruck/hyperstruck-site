import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

interface ContentIndexConfig {
  label: string;
  baseUrl: string;
  contentDirectory: string;
  outputPath: string;
}

interface SearchIndex {
  title: string;
  description?: string;
  breadcrumbs?: string[];
  content: string;
  url: string;
  keywords?: string;
}

const collections: ContentIndexConfig[] = [
  {
    label: 'Docs',
    baseUrl: '/docs',
    contentDirectory: path.join(workspaceRoot, 'content', 'docs'),
    outputPath: path.join(workspaceRoot, 'public', 'docs-search.json'),
  },
  {
    label: 'Blog',
    baseUrl: '/blog',
    contentDirectory: path.join(workspaceRoot, 'content', 'blog'),
    outputPath: path.join(workspaceRoot, 'public', 'blog-search.json'),
  },
];

function parseFrontmatter(source: string): {
  data: Record<string, string>;
  body: string;
} {
  const frontmatterMatch = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!frontmatterMatch) {
    return { data: {}, body: source };
  }

  const data = Object.fromEntries(
    frontmatterMatch[1]
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && line.includes(':'))
      .map((line) => {
        const separatorIndex = line.indexOf(':');
        const key = line.slice(0, separatorIndex).trim();
        const value = line
          .slice(separatorIndex + 1)
          .trim()
          .replace(/^['"]|['"]$/g, '');

        return [key, value];
      }),
  );

  return {
    data,
    body: source.slice(frontmatterMatch[0].length),
  };
}

function toPlainText(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, ' '))
    .replace(/`([^`]+)`/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[*-]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
    .replace(/\r/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function humanizeSegment(value: string): string {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function toUrl(filePath: string, config: ContentIndexConfig): string {
  const relativePath = path.relative(config.contentDirectory, filePath);
  const withoutExtension = relativePath.replace(/\.mdx?$/, '');

  if (withoutExtension === 'index') {
    return config.baseUrl;
  }

  if (withoutExtension.endsWith('/index')) {
    return `${config.baseUrl}/${withoutExtension.slice(0, -'/index'.length).replace(/\\/g, '/')}`;
  }

  return `${config.baseUrl}/${withoutExtension.replace(/\\/g, '/')}`;
}

function toTitle(filePath: string, frontmatterTitle?: string): string {
  if (frontmatterTitle) {
    return frontmatterTitle;
  }

  const baseName = path.basename(filePath, path.extname(filePath));
  return baseName
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function toBreadcrumbs(filePath: string, title: string, config: ContentIndexConfig): string[] {
  const relativePath = path.relative(config.contentDirectory, filePath).replace(/\\/g, '/');
  const segments = relativePath.replace(/\.mdx?$/, '').split('/').filter(Boolean);

  if (segments.at(-1) === 'index') {
    segments.pop();
  } else {
    segments.pop();
  }

  return [config.label, ...segments.map(humanizeSegment), title];
}

async function collectDocFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectDocFiles(fullPath);
      }

      if (entry.isFile() && /\.(md|mdx)$/.test(entry.name)) {
        return [fullPath];
      }

      return [];
    }),
  );

  return files.flat();
}

async function buildIndexes(config: ContentIndexConfig): Promise<SearchIndex[]> {
  const files = await collectDocFiles(config.contentDirectory);

  return Promise.all(
    files.map(async (filePath) => {
      const raw = await readFile(filePath, 'utf8');
      const { data, body } = parseFrontmatter(raw);
      const title = toTitle(filePath, data.title);
      const description = data.description;

      return {
        title,
        description,
        breadcrumbs: toBreadcrumbs(filePath, title, config),
        content: toPlainText(body),
        url: toUrl(filePath, config),
        keywords: [title, description].filter(Boolean).join(' '),
      } satisfies SearchIndex;
    }),
  );
}

async function main(): Promise<void> {
  await Promise.all(
    collections.map(async (config) => {
      const indexes = await buildIndexes(config);
      const body = JSON.stringify(indexes);

      await mkdir(path.dirname(config.outputPath), { recursive: true });
      await writeFile(config.outputPath, body, 'utf8');
    }),
  );
}

main().catch((error: unknown) => {
  console.error('Failed to generate static content search indexes.', error);
  process.exitCode = 1;
});
