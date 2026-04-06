import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import CoreValuePillarsSection from '../components/CoreValuePillarsSection';
import LearningModulesSection from '../components/LearningModulesSection';
import {
  architectureNodes,
  heroHighlights,
} from '../data/siteContent';

const nodePlacementMap = {
  topLeft: { top: 20, left: 0, transform: 'translateX(40px)' },
  topRight: { top: 20, right: 0, transform: 'translateX(-40px)' },
  bottomLeft: { bottom: 20, left: 0, transform: 'translateX(16px)' },
  bottomRight: { bottom: 20, right: 0, transform: 'translateX(-16px)' },
} as const;

export default function HomePage() {
  const theme = useTheme();

  return (
    <Box component="main">
      <Container maxWidth="xl" sx={{ pt: { xs: 7, md: 11 }, pb: { xs: 8, md: 12 } }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1.05fr 0.95fr' },
            gap: { xs: 6, lg: 10 },
            alignItems: 'center',
          }}
        >
          <Stack spacing={4}>
            <Chip
              label="The Cognitive Layer"
              sx={{
                width: 'fit-content',
                px: 1,
                border: `1px solid ${alpha(theme.palette.secondary.main, 0.35)}`,
                backgroundColor: alpha(theme.palette.secondary.main, 0.08),
                color: 'secondary.main',
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            />

            <Typography
              variant="h1"
              sx={{
                maxWidth: 780,
                fontSize: { xs: '3.25rem', md: '5.5rem' },
                lineHeight: 0.94,
              }}
            >
              <Box component="span" sx={{ color: 'primary.main' }}>
                Plug-and-play
              </Box>
              <br />
              intelligence.
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ maxWidth: 680, fontSize: { xs: '1.05rem', md: '1.25rem' }, lineHeight: 1.7 }}
            >
              Hyperstruck Core turns generic agents into domain specialists with unparalleled
              learning, higher-quality execution, and production-ready orchestration across the
              systems teams already trust.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                to="/pricing"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  justifyContent: 'space-between',
                  maxWidth: { xs: '100%', sm: 260 },
                  backgroundImage: theme.custom.gradients.primary,
                  boxShadow: theme.custom.shadows.glow,
                }}
              >
                Explore pricing
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                variant="outlined"
                startIcon={<MailOutlineRoundedIcon />}
                sx={{
                  borderColor: alpha(theme.palette.divider, 0.8),
                  color: 'text.primary',
                }}
              >
                Request sandbox access
              </Button>
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} useFlexGap flexWrap="wrap">
              {heroHighlights.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  variant="outlined"
                  sx={{ borderColor: alpha(theme.palette.divider, 0.8) }}
                />
              ))}
            </Stack>
          </Stack>

          <Box
            sx={{
              position: 'relative',
              minHeight: { xs: 520, md: 620 },
              overflow: 'hidden',
              borderRadius: 3,
              background:
                'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(2, 4, 8, 0) 40%)',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 40%), radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.05) 0%, transparent 40%)',
                pointerEvents: 'none',
              }}
            />

            <Card
              sx={{
                position: 'absolute',
                zIndex: 2,
                top: '50%',
                left: '50%',
                width: { xs: 192, md: 220 },
                height: { xs: 192, md: 220 },
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3,
                backgroundColor: alpha(theme.palette.background.paper, 0.88),
                borderColor: alpha(theme.palette.primary.main, 0.35),
                boxShadow: '0px 0px 50px rgba(99,102,241,0.15)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  filter: 'blur(24px)',
                }}
              />
              <HubRoundedIcon sx={{ position: 'relative', zIndex: 1, color: 'primary.main', fontSize: 44, mb: 1.5 }} />
              <Typography variant="overline" color="primary.main" sx={{ position: 'relative', zIndex: 1 }}>
                Central hub
              </Typography>
              <Typography variant="h4" sx={{ position: 'relative', zIndex: 1 }}>
                Intelligence Layer
              </Typography>
            </Card>

            {architectureNodes.map((node) => (
              <Card
                key={node.title}
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  width: node.placement.includes('bottom') ? { xs: 160, md: 184 } : { xs: 148, md: 168 },
                  p: 2.25,
                  backgroundColor: alpha(theme.palette.background.paper, 0.66),
                  ...nodePlacementMap[node.placement],
                }}
              >
                <Typography variant="overline" color="secondary.main" sx={{ fontSize: '0.58rem' }}>
                  {node.title}
                </Typography>
                <Box
                  sx={{
                    mt: 1.25,
                    minHeight: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 1,
                    borderRadius: 1,
                    backgroundColor: alpha(theme.palette.background.default, 0.6),
                  }}
                >
                  <Typography
                    color="text.secondary"
                    sx={{ textAlign: 'center', fontSize: '0.72rem', fontStyle: 'italic', lineHeight: 1.4 }}
                  >
                    {node.description}
                  </Typography>
                </Box>
              </Card>
            ))}

            <svg
              viewBox="0 0 400 400"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.2,
                zIndex: 1,
              }}
            >
              <path d="M100 100 L200 200" stroke="#6366F1" strokeDasharray="4 4" strokeWidth="1" />
              <path d="M300 100 L200 200" stroke="#6366F1" strokeDasharray="4 4" strokeWidth="1" />
              <path d="M100 300 L200 200" stroke="#6366F1" strokeDasharray="4 4" strokeWidth="1" />
              <path d="M300 300 L200 200" stroke="#6366F1" strokeDasharray="4 4" strokeWidth="1" />
            </svg>
          </Box>
        </Box>

        <LearningModulesSection />
        <CoreValuePillarsSection />

        <Card
          sx={{
            mt: { xs: 8, md: 12 },
            px: { xs: 4, md: 6 },
            py: { xs: 5, md: 7 },
            textAlign: 'center',
            backgroundImage: `linear-gradient(180deg, ${alpha(
              theme.palette.primary.main,
              0.16,
            )} 0%, ${alpha(theme.palette.background.paper, 0.92)} 100%)`,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '4rem' }, mb: 3 }}>
            Ready to unify your intelligence stack?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: 'auto', mb: 4, lineHeight: 1.75 }}>
            Start building with the most sophisticated cognitive orchestration layer ever
            engineered. No credit card required for sandbox access.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={RouterLink} to="/pricing" variant="contained" size="large">
              Get started free
            </Button>
            <Button component={RouterLink} to="/signup" variant="outlined" size="large">
              Talk to an engineer
            </Button>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
