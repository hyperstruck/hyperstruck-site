import type { Root } from 'fumadocs-core/page-tree';

interface FrontmatterLike {
  title?: string;
}

interface ContentTreeOptions {
  baseUrl: string;
  contentRoot: string;
  rootName: string;
}

interface PageNode {
  title: string;
  url: string;
  isIndex: boolean;
}

interface FolderNode {
  segment: string;
  folders: Map<string, FolderNode>;
  pages: PageNode[];
}

type TreeChild = Root['children'][number];

function createFolderNode(segment: string): FolderNode {
  return {
    segment,
    folders: new Map<string, FolderNode>(),
    pages: [],
  };
}

function humanizeSegment(value: string): string {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function normalizePath(value: string): string {
  return value.replace(/\\/g, '/');
}

function toRelativeContentPath(filePath: string, contentRoot: string): string | null {
  const normalizedPath = normalizePath(filePath);
  const normalizedRoot = normalizePath(contentRoot).replace(/^\.?\//, '');
  const marker = `${normalizedRoot}/`;
  const markerIndex = normalizedPath.lastIndexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return normalizedPath.slice(markerIndex + marker.length);
}

function toPageUrl(relativePath: string, baseUrl: string): string {
  const normalizedPath = relativePath.replace(/\.mdx?$/, '');

  if (normalizedPath === 'index') {
    return baseUrl;
  }

  if (normalizedPath.endsWith('/index')) {
    return `${baseUrl}/${normalizedPath.slice(0, -'/index'.length)}`;
  }

  return `${baseUrl}/${normalizedPath}`;
}

function sortFolderNode(node: FolderNode): void {
  node.pages.sort((left, right) => {
    if (left.isIndex !== right.isIndex) {
      return left.isIndex ? -1 : 1;
    }

    return left.title.localeCompare(right.title);
  });

  for (const folder of node.folders.values()) {
    sortFolderNode(folder);
  }
}

function toTreeChildren(node: FolderNode): TreeChild[] {
  const folders: TreeChild[] = [...node.folders.values()]
    .sort((left, right) => humanizeSegment(left.segment).localeCompare(humanizeSegment(right.segment)))
    .map((folder) => ({
      type: 'folder' as const,
      name: humanizeSegment(folder.segment),
      defaultOpen: true,
      children: toTreeChildren(folder),
    }));

  const indexPages: TreeChild[] = node.pages
    .filter((page) => page.isIndex)
    .map((page) => ({
      type: 'page' as const,
      name: page.title,
      url: page.url,
    }));

  const regularPages: TreeChild[] = node.pages
    .filter((page) => !page.isIndex)
    .map((page) => ({
      type: 'page' as const,
      name: page.title,
      url: page.url,
    }));

  return [...indexPages, ...folders, ...regularPages];
}

export function resolveContentEntry(
  pathname: string,
  basePath: string,
  rawEntries: Record<string, unknown>,
): string | null {
  const availableEntries = Object.keys(rawEntries).map((entry) =>
    entry.startsWith('./') ? entry.slice(2) : entry,
  );
  const normalizedBasePath = basePath.replace(/^\/+|\/+$/g, '');
  const normalizedPath = pathname
    .replace(new RegExp(`^/${normalizedBasePath}/?`), '')
    .replace(/\/+$/, '');
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

export function buildContentTree(
  frontmatters: Record<string, FrontmatterLike>,
  options: ContentTreeOptions,
): Root {
  const root = createFolderNode('');

  for (const [filePath, frontmatter] of Object.entries(frontmatters)) {
    const relativePath = toRelativeContentPath(filePath, options.contentRoot);

    if (!relativePath) {
      continue;
    }

    const normalizedPath = relativePath.replace(/\.mdx?$/, '');
    const segments = normalizedPath.split('/').filter(Boolean);
    const basename = segments[segments.length - 1];

    if (!basename) {
      continue;
    }

    const isIndex = basename === 'index';
    const folderSegments = isIndex ? segments.slice(0, -1) : segments.slice(0, -1);
    const fallbackTitle =
      frontmatter.title ??
      humanizeSegment(isIndex ? folderSegments[folderSegments.length - 1] ?? 'Home' : basename);

    let currentFolder = root;

    for (const segment of folderSegments) {
      const existingFolder = currentFolder.folders.get(segment);

      if (existingFolder) {
        currentFolder = existingFolder;
        continue;
      }

      const nextFolder = createFolderNode(segment);
      currentFolder.folders.set(segment, nextFolder);
      currentFolder = nextFolder;
    }

    currentFolder.pages.push({
      title: fallbackTitle,
      url: toPageUrl(relativePath, options.baseUrl),
      isIndex,
    });
  }

  sortFolderNode(root);

  return {
    name: options.rootName,
    children: toTreeChildren(root),
  };
}
