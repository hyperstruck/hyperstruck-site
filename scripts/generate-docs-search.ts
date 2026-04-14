import { mkdir, writeFile } from 'node:fs/promises';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const docsDirectory = path.join(workspaceRoot, 'content', 'docs');
const outputPath = path.join(workspaceRoot, 'public', 'docs-search.json');

interface SearchIndex {
  title: string;
  description?: string;
  breadcrumbs?: string[];
  content: string;
  url: string;
  keywords?: string;
}

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

function toUrl(filePath: string): string {
  const relativePath = path.relative(docsDirectory, filePath);
  const withoutExtension = relativePath.replace(/\.mdx?$/, '');

  if (withoutExtension === 'index') {
    return '/docs';
  }

  return `/docs/${withoutExtension.replace(/\\/g, '/')}`;
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

async function buildIndexes(): Promise<SearchIndex[]> {
  const files = await collectDocFiles(docsDirectory);

  return Promise.all(
    files.map(async (filePath) => {
      const raw = await readFile(filePath, 'utf8');
      const { data, body } = parseFrontmatter(raw);
      const title = toTitle(filePath, data.title);
      const description = data.description;

      return {
        title,
        description,
        breadcrumbs: ['Docs', title],
        content: toPlainText(body),
        url: toUrl(filePath),
        keywords: [title, description].filter(Boolean).join(' '),
      } satisfies SearchIndex;
    }),
  );
}

async function main(): Promise<void> {
  const indexes = await buildIndexes();
  const body = JSON.stringify(indexes);

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, body, 'utf8');
}

main().catch((error: unknown) => {
  console.error('Failed to generate static docs search index.', error);
  process.exitCode = 1;
});
