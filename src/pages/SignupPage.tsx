import { Box, Container, Typography } from '@mui/material';

import PageMeta from '../components/PageMeta';
import WaitlistFormCard from '../components/signup/WaitlistFormCard';

export default function SignupPage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: 'calc(100vh - 72px)',
        py: { xs: 8, md: 12 },
      }}
    >
      <PageMeta
        title="Request Access"
        description="Join the Hyperstruck early access programme. Tell us about your use case and we will help you get started."
        path="/signup"
      />
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.25rem' },
              mb: 2,
            }}
          >
            Request access
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: '1.05rem', lineHeight: 1.7 }}
          >
            Hyperstruck is in early access. Tell us about your use case
            and we will reach out to get you started.
          </Typography>
        </Box>

        <WaitlistFormCard />

        <Typography
          color="text.tertiary"
          sx={{
            mt: 3,
            textAlign: 'center',
            fontSize: '0.85rem',
            lineHeight: 1.6,
          }}
        >
          We will only use your email to contact you about Hyperstruck.
          No spam.
        </Typography>
      </Container>
    </Box>
  );
}
