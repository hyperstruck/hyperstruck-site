import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { featureRows, pricingTiers } from '../data/siteContent';
import { contactEmail, contactHref } from '../theme/tokens';

export default function PricingPage() {
  const theme = useTheme();

  return (
    <Box component="main">
      <Container maxWidth="xl" sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 860, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="overline" color="secondary.main">
            Pricing
          </Typography>
          <Typography variant="h1" sx={{ mt: 2, fontSize: { xs: '3rem', md: '5rem' } }}>
            Intelligence scaled to your ambition.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 3, fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.75 }}>
            Hyperstruck pricing is designed around the value your agents deliver, from early
            experimentation to organization-wide intelligence systems.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 7,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
            gap: 3,
          }}
        >
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              sx={{
                p: 4,
                height: '100%',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                borderColor: tier.featured
                  ? alpha(theme.palette.primary.main, 0.4)
                  : alpha(theme.palette.divider, 0.7),
                background:
                  tier.featured
                    ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.16)} 0%, ${alpha(
                        theme.palette.background.paper,
                        0.96,
                      )} 100%)`
                    : undefined,
              }}
            >
              {tier.featured ? (
                <Chip
                  label="Most popular"
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', top: 18, right: 18 }}
                />
              ) : null}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <Box>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ minHeight: 56 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1.5,
                        display: 'grid',
                        placeItems: 'center',
                        color: tier.featured ? 'primary.light' : 'primary.main',
                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.24)}`,
                        flexShrink: 0,
                      }}
                    >
                      <tier.icon />
                    </Box>
                    <Typography variant="h3">{tier.name}</Typography>
                  </Stack>

                  <Box sx={{ mt: 2, minHeight: 110 }}>
                    <Typography variant="overline" color="secondary.main">
                      {tier.label}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1.5 }}>
                      {tier.description}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1, minHeight: 84 }}>
                    <Typography variant="h4">{tier.price}</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      {tier.subtext ?? '\u00A0'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Stack spacing={2} sx={{ my: 4.5, minHeight: 176 }}>
                    {tier.featureList.map((feature) => (
                      <Stack key={feature.label} direction="row" spacing={1.5} alignItems="flex-start">
                        <feature.icon color="primary" sx={{ mt: '2px', fontSize: 20, flexShrink: 0 }} />
                        <Typography color="text.secondary">{feature.label}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Button
                    component="a"
                    href={contactHref}
                    fullWidth
                    variant="contained"
                    startIcon={<MailOutlineRoundedIcon />}
                    sx={{
                      mt: 'auto',
                      backgroundImage: theme.custom.gradients.primary,
                      boxShadow: theme.custom.shadows.glow,
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>

        <Card sx={{ mt: 8, p: { xs: 3, md: 4 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Box sx={{ maxWidth: 700 }}>
              <Typography variant="h4">Need a custom deployment or security review?</Typography>
              <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7 }}>
                Every contact-oriented action in the site now routes directly to {contactEmail}, so
                your visitors always have a real next step instead of a placeholder button.
              </Typography>
            </Box>
            <Button component="a" href={contactHref} variant="contained" size="large">
              Email Hyperstruck
            </Button>
          </Stack>
        </Card>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" textAlign="center" sx={{ mb: 4 }}>
            Features and capabilities
          </Typography>
          <TableContainer
            component={Card}
            sx={{
              overflowX: 'auto',
              '& .MuiTableCell-root': {
                borderColor: alpha(theme.palette.divider, 0.5),
              },
            }}
          >
            <Table aria-label="Hyperstruck pricing comparison">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 220 }}>Capability</TableCell>
                  <TableCell>Starter</TableCell>
                  <TableCell>Pro</TableCell>
                  <TableCell sx={{ color: 'primary.main' }}>Enterprise</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featureRows.map((row) => (
                  <TableRow key={row.capability} hover>
                    <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>{row.capability}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{row.starter}</TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{row.pro}</TableCell>
                    <TableCell sx={{ color: 'primary.light', fontWeight: 600 }}>{row.enterprise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Box>
  );
}
