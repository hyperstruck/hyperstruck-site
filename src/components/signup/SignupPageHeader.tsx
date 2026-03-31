import { Box, Typography } from '@mui/material';

export default function SignupPageHeader() {
  return (
    <Box sx={{ mb: 5, textAlign: 'center' }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '2.6rem', md: '3.2rem' }, mb: 2 }}>
        Initialize Access.
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
        Join the Intelligence revolution.
      </Typography>
    </Box>
  );
}
