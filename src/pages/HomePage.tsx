import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
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
  heroHighlights,
  metrics,
} from '../data/siteContent';

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
              label="Benchmark-Proven Intelligence Layer"
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
              Same model.
              <br />
              Same tools.
              <br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                Better judgment.
              </Box>
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ maxWidth: 680, fontSize: { xs: '1.05rem', md: '1.25rem' }, lineHeight: 1.7 }}
            >
              Hyperstruck gives agents a compounding intelligence layer that improves execution
              quality over time, not just output generation in the moment. When agents can use
              accumulated learnings, they take better actions, avoid repeated mistakes, and apply
              proven strategies from prior work.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  justifyContent: 'space-between',
                  maxWidth: { xs: '100%', sm: 260 },
                  backgroundImage: theme.custom.gradients.primary,
                  boxShadow: theme.custom.shadows.glow,
                }}
              >
                Request API access
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
                Talk to an engineer
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

            <Typography
              color="text.secondary"
              sx={{ maxWidth: 720, fontSize: '0.95rem', lineHeight: 1.75 }}
            >
              These results came from benchmark runs across different domains using the same agent,
              same LLM, same tools, and the same tasks. The only difference was whether the agent
              had access to learnings from prior executions.
            </Typography>
          </Stack>

          <Box
            sx={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              gap: 2.25,
              alignSelf: 'center',
              alignItems: 'start',
              alignContent: 'center',
              justifySelf: 'center',
              width: '100%',
              maxWidth: 560,
            }}
          >
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              const isFeatured = index === 0;
              const isLast = index === metrics.length - 1;
              const [withLearnings, baseline] = metric.value.split(' vs ');

              return (
                <Card
                  key={`${metric.value}-${metric.label}`}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    p: { xs: 1.7, md: 1.9 },
                    gridColumn: isLast ? { xs: 'auto', sm: '1 / -1' } : undefined,
                    display: 'flex',
                    flexDirection: 'column',
                    background: isFeatured
                      ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
                      : `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.82)} 0%, ${alpha(theme.palette.background.paper, 0.62)} 100%)`,
                    borderColor: alpha(
                      isFeatured ? theme.palette.primary.main : theme.palette.divider,
                      isFeatured ? 0.34 : 0.36,
                    ),
                    boxShadow: isFeatured ? '0px 0px 50px rgba(99,102,241,0.12)' : undefined,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 'auto -12% -24% auto',
                      width: 160,
                      height: 160,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, isFeatured ? 0.22 : 0.12)} 0%, transparent 72%)`,
                      filter: 'blur(18px)',
                      pointerEvents: 'none',
                    }}
                  />
                  <Stack
                    spacing={0.95}
                    sx={{ position: 'relative', zIndex: 1 }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                      <Typography
                        sx={{
                          lineHeight: 1.2,
                          fontSize: { xs: '0.94rem', md: isFeatured ? '1.02rem' : '0.97rem' },
                          fontWeight: 600,
                          maxWidth: isLast ? 420 : undefined,
                          color: 'secondary.main',
                        }}
                      >
                        {metric.label}
                      </Typography>
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          borderRadius: 2,
                          display: 'grid',
                          placeItems: 'center',
                          backgroundColor: alpha(theme.palette.primary.main, 0.14),
                          color: 'primary.main',
                          flexShrink: 0,
                        }}
                      >
                        <Icon fontSize="small" />
                      </Box>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="stretch"
                    >
                      <Box
                        sx={{
                          flex: 1,
                          px: 0.85,
                          py: 0.72,
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', lineHeight: 1, fontSize: '0.72rem' }}
                        >
                          With learnings
                        </Typography>
                        <Typography
                          sx={{
                            mt: 0.04,
                            fontSize: { xs: '1.45rem', md: isFeatured ? '1.85rem' : '1.7rem' },
                            fontWeight: 700,
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {withLearnings}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          alignSelf: 'center',
                          color: 'text.secondary',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        vs
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          px: 0.85,
                          py: 0.72,
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.background.default, 0.44),
                          border: `1px solid ${alpha(theme.palette.divider, 0.28)}`,
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', lineHeight: 1, fontSize: '0.72rem' }}
                        >
                          Without
                        </Typography>
                        <Typography
                          sx={{
                            mt: 0.04,
                            fontSize: { xs: '1.45rem', md: isFeatured ? '1.85rem' : '1.7rem' },
                            fontWeight: 700,
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            fontVariantNumeric: 'tabular-nums',
                          }}
                        >
                          {baseline}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Card>
              );
            })}
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
            Ready to build agents that improve with experience?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 760, mx: 'auto', mb: 4, lineHeight: 1.75 }}>
            Hyperstruck is built for teams that want more than raw model output. If you need
            better judgment, stronger operational learning, and measurable improvement over time,
            request access and we will help you get started.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button component={RouterLink} to="/signup" variant="contained" size="large">
              Request API access
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
