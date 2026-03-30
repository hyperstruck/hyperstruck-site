export const contactEmail = 'hello@hyperstruck.com';
export const contactHref = `mailto:${contactEmail}`;

export const brandTokens = {
  colors: {
    background: '#020408',
    surface: '#101419',
    surfaceLow: '#181c22',
    surfaceHigh: '#262a31',
    surfaceHighest: '#31353c',
    primary: '#6366f1',
    primaryBright: '#8083ff',
    secondary: '#4cd7f6',
    tertiary: '#d0bcff',
    textPrimary: '#e0e2eb',
    textSecondary: '#c7c4d7',
    outline: '#464554',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #6366f1 0%, #8083ff 100%)',
    ambient:
      'radial-gradient(circle at top left, rgba(99, 102, 241, 0.16) 0%, transparent 34%), radial-gradient(circle at bottom right, rgba(76, 215, 246, 0.12) 0%, transparent 30%)',
  },
  shadows: {
    glow: '0px 20px 48px rgba(99, 102, 241, 0.18)',
    soft: '0px 18px 30px rgba(0, 0, 0, 0.22)',
  },
  blur: 'blur(24px)',
} as const;
