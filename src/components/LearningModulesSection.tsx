import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { learningModules } from '../data/siteContent';
import { getRevealProgress, useParallaxProgress } from '../useParallaxProgress';
import SectionHeading from './SectionHeading';
import ThreeModulePreview from './ThreeModulePreview';

const accentColorMap = {
  primary: '#6366f1',
  secondary: '#4cd7f6',
  tertiary: '#d0bcff',
  primarySoft: '#c0c1ff',
  secondarySoft: '#acedff',
  tertiarySoft: '#e9ddff',
} as const;

function LearningModuleChapter({
  index,
}: {
  index: number;
}) {
  const theme = useTheme();
  const module = learningModules[index];
  const { ref, progress } = useParallaxProgress<HTMLDivElement>();
  const reveal = getRevealProgress(progress, 0.1);
  const accentColor = accentColorMap[module.accent];
  const Icon = module.icon;
  const isReversed = index % 2 === 1;

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '90vh' },
        py: { xs: 6, md: 8 },
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.95fr) minmax(0, 1.05fr)' },
        gap: { xs: 4, md: 8 },
        borderTop: index === 0 ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.2)}`,
      }}
    >
      <Box
        sx={{
          order: { xs: 2, md: isReversed ? 2 : 1 },
          maxWidth: 620,
          opacity: 0.14 + reveal * 0.86,
          transform: `translate3d(0, ${(1 - reveal) * 90}px, 0)`,
          transition: 'transform 180ms linear, opacity 180ms linear',
        }}
      >
        <Icon sx={{ fontSize: 44, color: accentColor, mb: 2.5 }} />
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.4rem' }, mb: 2 }}>
          {module.title}
        </Typography>
        <Typography variant="overline" color="secondary.main" sx={{ display: 'block', mb: 3 }}>
          {module.eyebrow}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.12rem' }, lineHeight: 1.85, mb: 4 }}>
          {module.description}
        </Typography>
        <Box
          sx={{
            maxWidth: 520,
            pl: 2.5,
            borderLeft: `2px solid ${alpha(accentColor, 0.35)}`,
          }}
        >
          <Typography variant="overline" sx={{ color: alpha(accentColor, 0.92), display: 'block', mb: 1 }}>
            The Difference
          </Typography>
          <Typography sx={{ color: 'text.primary', fontStyle: 'italic', lineHeight: 1.75 }}>
            "{module.difference}"
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          order: { xs: 1, md: isReversed ? 1 : 2 },
          position: 'relative',
          opacity: 0.22 + reveal * 0.78,
          transform: `translate3d(0, ${(1 - reveal) * 54}px, 0)`,
          transition: 'transform 180ms linear, opacity 180ms linear',
        }}
      >
        <Box sx={{ position: { xs: 'relative', md: 'sticky' }, top: { md: 104 } }}>
          <ThreeModulePreview
            accentColor={accentColor}
            progress={progress}
            variant={module.animationVariant}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default function LearningModulesSection() {
  const theme = useTheme();
  const { ref, progress } = useParallaxProgress<HTMLDivElement>();

  return (
    <Box ref={ref} sx={{ mt: { xs: 9, md: 13 }, position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          position: 'absolute',
          inset: '-10% -12% auto',
          height: { xs: 280, md: 360 },
          pointerEvents: 'none',
          background: `radial-gradient(circle at 50% 0%, ${alpha(theme.palette.primary.main, 0.18)} 0%, transparent 70%)`,
          opacity: 0.8,
          transform: `translate3d(0, ${(0.5 - progress) * 72}px, 0) scale(${1 + progress * 0.04})`,
          transition: 'transform 140ms linear',
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SectionHeading
          title="Learning Intelligence"
          description="Beyond simple retrieval. We've built an architectural memory that grows more capable with every cycle of execution."
          align="center"
          maxWidth={760}
        />
      </Box>

      <Box
        sx={{
          mt: { xs: 5, md: 7 },
        }}
      >
        {learningModules.map((module, index) => (
          <LearningModuleChapter key={module.title} index={index} />
        ))}
      </Box>
    </Box>
  );
}
