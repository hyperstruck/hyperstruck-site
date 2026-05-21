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
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import PageMeta from '../components/PageMeta';
import { featureRows, pricingTiers } from '../data/siteContent';

export default function PricingPage() {
  const theme = useTheme();

  return (
    <Box component="main">
      <PageMeta
        title="Pricing"
        description="Simple, transparent pricing for Hyperstruck. Start free, scale as your agents learn."
        path="/pricing"
      />
      <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 640, mx: 'auto', textAlign: 'center' }}>
          <Chip
            label="Early access"
            size="small"
            sx={{
              mb: 3,
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              fontWeight: 600,
            }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.75rem', md: '4rem' }, mb: 2 }}>
            Simple, transparent pricing
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.75 }}
          >
            Start free. Scale as your agents learn. Pricing is designed
            around the value your agents deliver, not the tokens they consume.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 7,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                borderColor: tier.featured
                  ? theme.palette.primary.main
                  : theme.palette.divider,
                borderWidth: tier.featured ? 2 : 1,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {tier.name}
                </Typography>
                <Typography color="text.secondary" sx={{ fontSize: '0.95rem', minHeight: 44 }}>
                  {tier.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: '2.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {tier.price}
                </Typography>
                {tier.subtext ? (
                  <Typography color="text.tertiary" sx={{ mt: 0.5, fontSize: '0.85rem' }}>
                    {tier.subtext}
                  </Typography>
                ) : null}
              </Box>

              <Stack spacing={1.5} sx={{ mb: 4, flexGrow: 1 }}>
                {tier.featureList.map((feature) => (
                  <Typography
                    key={feature}
                    color="text.secondary"
                    sx={{ fontSize: '0.9rem', pl: 2, position: 'relative', '&::before': { content: '"\\2022"', position: 'absolute', left: 0, color: 'text.tertiary' } }}
                  >
                    {feature}
                  </Typography>
                ))}
              </Stack>

              <Button
                component={RouterLink}
                to="/signup"
                fullWidth
                variant={tier.featured ? 'contained' : 'outlined'}
              >
                {tier.price === 'Contact us' ? 'Talk to us' : 'Get started'}
              </Button>
            </Card>
          ))}
        </Box>

        <Box sx={{ mt: 10 }}>
          <Typography variant="h3" textAlign="center" sx={{ mb: 1 }}>
            Feature comparison
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 5, fontSize: '0.95rem' }}
          >
            Detailed breakdown of what each plan includes.
          </Typography>
          <TableContainer
            component={Card}
            sx={{
              overflowX: 'auto',
              '& .MuiTableCell-root': {
                borderColor: theme.palette.divider,
                py: 2,
              },
            }}
          >
            <Table aria-label="Pricing feature comparison">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: 200, fontWeight: 600 }}>
                    Capability
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Starter</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Pro</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'primary.dark' }}>
                    Enterprise
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {featureRows.map((row) => (
                  <TableRow key={row.capability} hover>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {row.capability}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {row.starter}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>
                      {row.pro}
                    </TableCell>
                    <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {row.enterprise}
                    </TableCell>
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
