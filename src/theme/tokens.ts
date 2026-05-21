export const contactEmail = 'hello@hyperstruck.com';
export const contactHref = `mailto:${contactEmail}`;

export const brandTokens = {
  colors: {
    background: '#FAFAF7',
    backgroundSubtle: '#F5F3EF',
    surface: '#FFFFFF',
    surfaceHover: '#F9F8F6',
    accent: '#2BA89E',
    accentDark: '#1A7A70',
    accentHover: '#23918A',
    accentSubtle: '#ECFDF8',
    accentText: '#FFFFFF',
    text: '#18181B',
    textSecondary: '#52525B',
    textTertiary: '#A1A1AA',
    border: '#E4E2DD',
    borderStrong: '#D1CEC7',
  },
  fonts: {
    display: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"JetBrains Mono", monospace',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0 4px 12px rgba(0, 0, 0, 0.06)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.08)',
  },
} as const;
