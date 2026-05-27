import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';


import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { NavLink, Outlet, Link as RouterLink } from 'react-router-dom';

import { BLOG_HOME_URL } from '../lib/blogLayout';
import { contactEmail } from '../theme/tokens';

const navItems = [
  { label: 'Use cases', to: '/use-cases' },
  { label: 'Docs', to: '/docs' },
  { label: 'Blog', to: BLOG_HOME_URL },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
] as const;

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'Use cases', to: '/use-cases' },
      { label: 'Docs', to: '/docs' },
      { label: 'Blog', to: BLOG_HOME_URL },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', href: `mailto:${contactEmail}` },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/hyperstruck', external: true },
    ],
  },
] as const;

const footerLinkSx = { fontSize: '0.9rem' } as const;

export default function AppLayout() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="inherit"
              sx={{
                flexShrink: 0,
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '1.4rem',
                letterSpacing: '-0.04em',
              }}
            >
              Hyperstruck
            </Link>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                ml: 4,
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  component={NavLink}
                  to={item.to}
                  underline="none"
                  sx={{
                    px: 1.5,
                    py: 0.75,
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'text.secondary',
                    borderRadius: 1,
                    transition: 'color 150ms ease',
                    '&:hover': { color: 'text.primary' },
                    '&.active': { color: 'text.primary' },
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>

            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              size="small"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                px: 3,
                py: 1,
              }}
            >
              Request access
            </Button>

            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' }, ml: 'auto' }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 320,
            p: 3,
          },
        }}
      >
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          {navItems.map((item) => (
            <Link
              key={item.label}
              component={NavLink}
              to={item.to}
              underline="none"
              onClick={() => setMobileOpen(false)}
              sx={{
                py: 1.5,
                px: 2,
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'text.secondary',
                borderRadius: 1,
                '&:hover': { backgroundColor: 'action.hover' },
                '&.active': { color: 'text.primary' },
              }}
            >
              {item.label}
            </Link>
          ))}
          <Divider sx={{ my: 1 }} />
          <Button
            component={RouterLink}
            to="/signup"
            variant="contained"
            fullWidth
            onClick={() => setMobileOpen(false)}
          >
            Request access
          </Button>
        </Stack>
      </Drawer>

      <Outlet />

      <Box
        component="footer"
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          mt: 12,
          py: { xs: 6, md: 8 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr 1fr 1fr' },
              gap: { xs: 4, md: 6 },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: theme.typography.h1.fontFamily,
                  fontSize: '1.25rem',
                  mb: 1.5,
                }}
              >
                Hyperstruck
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ maxWidth: 280, fontSize: '0.9rem', lineHeight: 1.7 }}
              >
                Reasoning engine and learning system for AI agents that
                improve with experience.
              </Typography>
            </Box>

            {footerSections.map((section) => (
              <Box key={section.title}>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.tertiary', display: 'block', mb: 1.5 }}
                >
                  {section.title}
                </Typography>
                <Stack spacing={1}>
                  {section.links.map((link) =>
                    'to' in link ? (
                      <Link key={link.label} component={NavLink} to={link.to} underline="hover" color="text.secondary" sx={footerLinkSx}>
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        underline="hover"
                        color="text.secondary"
                        sx={footerLinkSx}
                        {...('external' in link ? { target: '_blank', rel: 'noopener' } : {})}
                      >
                        {link.label}
                      </Link>
                    ),
                  )}
                </Stack>
              </Box>
            ))}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography color="text.tertiary" sx={{ fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} Hyperstruck. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
