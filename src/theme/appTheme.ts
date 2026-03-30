import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';

import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';

import { brandTokens } from './tokens';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      gradients: typeof brandTokens.gradients;
      shadows: typeof brandTokens.shadows;
      blur: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      gradients?: typeof brandTokens.gradients;
      shadows?: typeof brandTokens.shadows;
      blur?: string;
    };
  }
}

const baseTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: brandTokens.colors.primary,
      light: brandTokens.colors.primaryBright,
    },
    secondary: {
      main: brandTokens.colors.secondary,
    },
    background: {
      default: brandTokens.colors.background,
      paper: brandTokens.colors.surface,
    },
    text: {
      primary: brandTokens.colors.textPrimary,
      secondary: brandTokens.colors.textSecondary,
    },
    divider: alpha(brandTokens.colors.outline, 0.5),
  },
  shape: {
    borderRadius: 10,
  },
  spacing: 8,
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.05em',
    },
    h2: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h3: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
    overline: {
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: 500,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
    },
  },
  custom: {
    gradients: brandTokens.gradients,
    shadows: brandTokens.shadows,
    blur: brandTokens.blur,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          colorScheme: 'dark',
        },
        'html, body, #root': {
          minHeight: '100%',
        },
        body: {
          margin: 0,
          backgroundColor: brandTokens.colors.background,
          backgroundImage: brandTokens.gradients.ambient,
          color: brandTokens.colors.textPrimary,
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        '*': {
          boxSizing: 'border-box',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 20,
          paddingBlock: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(brandTokens.colors.surfaceHighest, 0.55),
          backdropFilter: brandTokens.blur,
          border: `1px solid ${alpha(brandTokens.colors.outline, 0.32)}`,
          boxShadow: brandTokens.shadows.soft,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
  },
});

const appTheme = responsiveFontSizes(baseTheme);

export default appTheme;
