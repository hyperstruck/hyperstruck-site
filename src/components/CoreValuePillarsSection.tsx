import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { compatibilityItems, valuePillars } from '../data/siteContent';
import { getRevealProgress, useParallaxProgress } from '../useParallaxProgress';

const accentColorMap = {
  primary: '#6366f1',
  secondary: '#4cd7f6',
  tertiary: '#d0bcff',
} as const;

interface PillarCardProps {
  title: string;
  description: string;
  accent: keyof typeof accentColorMap;
  icon: typeof valuePillars[number]['icon'];
  progress: number;
  delay: number;
  minHeight?:
    | number
    | string
    | Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number | string>>;
  featured?: boolean;
  muted?: boolean;
  visual?: ReactNode;
}

function PillarCard({
  title,
  description,
  accent,
  icon: Icon,
  progress,
  delay,
  minHeight,
  featured = false,
  muted = false,
  visual,
}: PillarCardProps) {
  const theme = useTheme();
  const reveal = getRevealProgress(progress, delay);
  const translateY = (1 - reveal) * (featured ? 64 : 44) + (0.5 - progress) * (featured ? 26 : 16);

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        p: { xs: 3.5, md: 4 },
        minHeight,
        background: featured
          ? `linear-gradient(180deg, ${alpha(accentColorMap[accent], 0.18)} 0%, ${alpha(theme.palette.background.paper, 0.78)} 100%)`
          : muted
            ? alpha(theme.palette.background.paper, 0.28)
            : alpha(theme.palette.background.paper, 0.62),
        borderColor: alpha(accentColorMap[accent], featured ? 0.22 : 0.14),
        opacity: 0.4 + reveal * 0.6,
        transform: `translate3d(0, ${translateY}px, 0) scale(${0.97 + reveal * 0.03})`,
        transition: 'transform 180ms linear, opacity 180ms linear, border-color 300ms ease',
        '&:hover': {
          borderColor: alpha(accentColorMap[accent], 0.35),
        },
      }}
    >
      {featured ? (
        <>
          <Box
            sx={{
              position: 'absolute',
              inset: 'auto -12% -18% 18%',
              height: '52%',
              background: `radial-gradient(circle at center, ${alpha(accentColorMap[accent], 0.34)} 0%, transparent 72%)`,
              filter: 'blur(28px)',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: '54% 10% 12% auto',
              width: '54%',
              borderRadius: 3,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              opacity: 0.55,
              pointerEvents: 'none',
            }}
          />
        </>
      ) : null}

      <Icon sx={{ position: 'relative', zIndex: 1, fontSize: featured ? 44 : 38, color: accentColorMap[accent], mb: 3 }} />
      <Typography variant={featured ? 'h3' : 'h4'} sx={{ position: 'relative', zIndex: 1, mb: 2 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ position: 'relative', zIndex: 1, lineHeight: 1.75, maxWidth: featured ? 420 : undefined }}>
        {description}
      </Typography>
      {visual ? <Box sx={{ position: 'relative', zIndex: 1, mt: 4 }}>{visual}</Box> : null}
    </Card>
  );
}

function BenchmarkImpactVisual() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 210,
        borderRadius: 3,
        overflow: 'hidden',
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.default, 0.24)} 0%, ${alpha('#d0bcff', 0.1)} 100%)`,
        border: `1px solid ${alpha('#d0bcff', 0.14)}`,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: '14% auto auto 10%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#d0bcff', 0.24)} 0%, transparent 72%)`,
          filter: 'blur(22px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
          opacity: 0.45,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: '22% 12% auto 12%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {['Known problems', 'Silent failures', 'Task quality'].map((label, index) => (
          <Box
            key={label}
            sx={{
              px: 1.5,
              py: 0.75,
              borderRadius: 999,
              fontSize: '0.74rem',
              color: index === 1 ? 'text.primary' : 'text.secondary',
              backgroundColor: alpha(theme.palette.background.paper, 0.48),
              border: `1px solid ${alpha('#d0bcff', index === 1 ? 0.28 : 0.14)}`,
              backdropFilter: 'blur(10px)',
            }}
          >
            {label}
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          inset: '38% 18% 18% 18%',
        }}
      >
        <svg
          viewBox="0 0 320 180"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="domain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d0bcff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <path d="M28 128 C72 94, 100 84, 160 92 S244 116, 292 60" fill="none" stroke="url(#domain-gradient)" strokeWidth="2" strokeDasharray="5 5" />
          <path d="M28 48 C90 62, 116 98, 160 92 S238 66, 292 120" fill="none" stroke="url(#domain-gradient)" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="28" cy="128" r="8" fill="#d0bcff" fillOpacity="0.85" />
          <circle cx="160" cy="92" r="10" fill="#cfd4ff" fillOpacity="0.9" />
          <circle cx="292" cy="60" r="8" fill="#4cd7f6" fillOpacity="0.7" />
          <circle cx="292" cy="120" r="8" fill="#d0bcff" fillOpacity="0.7" />
        </svg>
      </Box>
    </Box>
  );
}

export default function CoreValuePillarsSection() {
  const theme = useTheme();
  const { ref, progress } = useParallaxProgress<HTMLDivElement>();
  const [learning, reasoning, benchmarkedImpact, trust, productionReadiness] =
    valuePillars;
  const compatibilityReveal = getRevealProgress(progress, 0.28);

  return (
    <Box ref={ref} sx={{ mt: { xs: 9, md: 13 }, position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: '10% auto auto -10%',
          width: { xs: 220, md: 320 },
          height: { xs: 220, md: 320 },
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.12)} 0%, transparent 72%)`,
          transform: `translate3d(0, ${(0.5 - progress) * 64}px, 0)`,
          pointerEvents: 'none',
          transition: 'transform 140ms linear',
        }}
      />

      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3.2rem' }, mb: 2 }}>
          A compounding intelligence layer
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 760, lineHeight: 1.75, mb: 2.5 }}>
          Hyperstruck improves decision quality now through reasoning, improves decision quality
          later through learning, and makes both usable in production through trust and
          integration.
        </Typography>
        <Box sx={{ width: 48, height: 4, borderRadius: 999, backgroundColor: 'primary.main' }} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.08fr) minmax(0, 1fr)' },
          gap: 3,
        }}
      >
        <Stack spacing={3}>
          <PillarCard {...learning} progress={progress} delay={0.02} minHeight={240} />
          <PillarCard {...reasoning} progress={progress} delay={0.12} minHeight={210} muted />
        </Stack>

        <PillarCard
          {...benchmarkedImpact}
          progress={progress}
          delay={0.08}
          minHeight={{ xs: 280, md: 494 }}
          featured
          visual={<BenchmarkImpactVisual />}
        />

        <Stack spacing={3}>
          <PillarCard {...trust} progress={progress} delay={0.16} minHeight={210} muted />
          <PillarCard {...productionReadiness} progress={progress} delay={0.24} minHeight={240} />
        </Stack>

        <Card
          sx={{
            gridColumn: { md: '1 / -1' },
            mt: { xs: 0, md: 1 },
            p: { xs: 3.5, md: 4.5 },
            backgroundColor: alpha(theme.palette.background.paper, 0.62),
            borderColor: alpha(theme.palette.divider, 0.32),
            opacity: 0.44 + compatibilityReveal * 0.56,
            transform: `translate3d(0, ${(1 - compatibilityReveal) * 46 + (0.5 - progress) * 12}px, 0) scale(${0.97 + compatibilityReveal * 0.03})`,
            transition: 'transform 180ms linear, opacity 180ms linear',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
              gap: 4,
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Fits existing systems
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, lineHeight: 1.75, maxWidth: 620 }}>
                Use Hyperstruck through APIs, MCP, and developer workflows like Claude Code and
                Cursor so agents can benefit from prior learnings without rebuilding your stack.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              {compatibilityItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Box
                    key={item.label}
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: 'grid',
                      placeItems: 'center',
                      backgroundColor: alpha(theme.palette.background.default, 0.54),
                      border: `1px solid ${alpha(theme.palette.divider, 0.32)}`,
                    }}
                  >
                    <Icon sx={{ color: accentColorMap[item.accent] }} />
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
