import { Box, Container } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import SignupPageHeader from '../components/signup/SignupPageHeader';
import WaitlistFormCard from '../components/signup/WaitlistFormCard';

export default function SignupPage() {
  const theme = useTheme();

  return (
    <Box
      component="main"
      sx={{
        minHeight: 'calc(100vh - 84px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.32,
          filter: 'grayscale(100%) contrast(1.2)',
          transform: 'scale(1.08)',
          transformOrigin: 'center',
          backgroundImage: 'url(/images/signup-network-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top right, rgba(192, 193, 255, 0.1), transparent 44%), radial-gradient(circle at bottom left, rgba(76, 215, 246, 0.08), transparent 40%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(180deg, rgba(2, 4, 8, 0.88) 0%, rgba(2, 4, 8, 0.36) 45%, rgba(2, 4, 8, 0.88) 100%)',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: 'relative',
          zIndex: 2,
          pt: { xs: 8, md: 11 },
          pb: { xs: 10, md: 12 },
        }}
      >
        <SignupPageHeader />
        <WaitlistFormCard />
      </Container>
    </Box>
  );
}
