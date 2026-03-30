import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
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
  useMediaQuery,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { contactEmail, contactHref } from '../theme/tokens';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Pricing', to: '/pricing' },
] as const;

const navLinkStyles = {
  color: 'text.secondary',
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 600,
  px: 0.5,
  py: 0.75,
  borderBottom: '2px solid transparent',
  transition: 'color 180ms ease, border-color 180ms ease',
  '&:hover': {
    color: 'text.primary',
  },
  '&.active': {
    color: 'text.primary',
    borderColor: 'primary.main',
  },
} as const;

export default function AppLayout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const footerLinks = useMemo(
    () => [
      { label: 'Pricing', to: '/pricing' },
    ],
    [],
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: theme.custom.blur,
          backgroundColor: alpha(theme.palette.background.default, 0.78),
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
          boxShadow: theme.custom.shadows.soft,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 84, gap: 3 }}>
            <Link
              component={NavLink}
              to="/"
              underline="none"
              color="inherit"
              sx={{
                flexShrink: 0,
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: { xs: '1.15rem', md: '1.4rem' },
                letterSpacing: '-0.04em',
              }}
            >
              Core by Hyperstruck
            </Link>

            {isDesktop ? (
              <>
                <Stack direction="row" spacing={3} sx={{ ml: 2, flexGrow: 1 }}>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      component={NavLink}
                      to={item.to}
                      underline="none"
                      sx={navLinkStyles}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Stack>

                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="contained"
                    component="a"
                    href={contactHref}
                    sx={{
                      backgroundImage: theme.custom.gradients.primary,
                      boxShadow: theme.custom.shadows.glow,
                    }}
                  >
                    Request access
                  </Button>
                </Stack>
              </>
            ) : (
              <Box sx={{ ml: 'auto' }}>
                <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
                  <MenuRoundedIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            p: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.96),
            backgroundImage: 'none',
          },
        }}
      >
        <Stack spacing={2.5}>
          <Typography variant="h6">Navigate</Typography>
          {navItems.map((item) => (
            <Link
              key={item.label}
              component={NavLink}
              to={item.to}
              underline="none"
              onClick={() => setMobileOpen(false)}
              sx={navLinkStyles}
            >
              {item.label}
            </Link>
          ))}
          <Divider />
          <Button component="a" href={contactHref} variant="contained">
            Contact {contactEmail}
          </Button>
        </Stack>
      </Drawer>

      <Outlet />

      <Box
        component="footer"
        sx={{
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.45)}`,
          mt: 10,
          py: { xs: 6, md: 8 },
          backgroundColor: alpha(theme.palette.background.default, 0.8),
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr' },
            gap: 5,
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              Hyperstruck
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
              Engineering the next era of intelligence with data in motion and decisions at speed.
            </Typography>
          </Box>

          <Box>
            <Typography variant="overline" color="secondary.main">
              Product
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1 }}>
              {footerLinks.map((item) =>
                item.to ? (
                  <Link
                    key={item.label}
                    component={NavLink}
                    to={item.to}
                    underline="hover"
                    color="text.secondary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    underline="hover"
                    color="text.secondary"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </Stack>
          </Box>

          <Box>
            <Typography variant="overline" color="secondary.main">
              Contact
            </Typography>
            <Stack spacing={1.25} sx={{ mt: 1 }}>
              <Typography color="text.secondary">Ready to explore a custom deployment?</Typography>
              <Link href={contactHref} underline="hover">
                {contactEmail}
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
