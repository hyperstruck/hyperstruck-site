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

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import { brandTokens } from './tokens';

declare module '@mui/material/styles' {
  interface TypeText {
    tertiary: string;
  }

  interface Theme {
    custom: {
      shadows: typeof brandTokens.shadows;
    };
  }

  interface ThemeOptions {
    custom?: {
      shadows?: typeof brandTokens.shadows;
    };
  }
}

const { colors, fonts } = brandTokens;

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.accent,
      light: colors.accentSubtle,
      dark: colors.accentDark,
      contrastText: colors.accentText,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
      tertiary: colors.textTertiary,
    },
    divider: colors.border,
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  typography: {
    fontFamily: fonts.body,
    h1: {
      fontFamily: fonts.display,
      fontWeight: 700,
      letterSpacing: '-0.05em',
    },
    h2: {
      fontFamily: fonts.display,
      fontWeight: 700,
      letterSpacing: '-0.04em',
    },
    h3: {
      fontFamily: fonts.display,
      fontWeight: 700,
      letterSpacing: '-0.03em',
    },
    h4: {
      fontFamily: fonts.display,
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontFamily: fonts.display,
      fontWeight: 700,
    },
    h6: {
      fontFamily: fonts.display,
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none' as const,
    },
    overline: {
      fontFamily: fonts.mono,
      fontWeight: 500,
      letterSpacing: '0.22em',
      textTransform: 'uppercase' as const,
    },
  },
  custom: {
    shadows: brandTokens.shadows,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          colorScheme: 'light',
        },
        'html, body, #root': {
          minHeight: '100%',
        },
        body: {
          margin: 0,
          backgroundColor: colors.background,
          color: colors.text,
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        '*': {
          boxSizing: 'border-box',
        },
        '::selection': {
          backgroundColor: colors.accentSubtle,
          color: colors.accent,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 24,
          paddingBlock: 12,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: colors.accent,
          color: colors.accentText,
          '&:hover': {
            backgroundColor: colors.accentHover,
          },
        },
        outlined: {
          borderColor: colors.border,
          color: colors.text,
          '&:hover': {
            borderColor: colors.borderStrong,
            backgroundColor: colors.surfaceHover,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          boxShadow: brandTokens.shadows.sm,
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background,
          color: colors.text,
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.border,
            },
            '&:hover fieldset': {
              borderColor: colors.borderStrong,
            },
          },
        },
      },
    },
  },
});

const appTheme = responsiveFontSizes(baseTheme);

export default appTheme;
