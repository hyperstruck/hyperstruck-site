import { Stack, Typography } from '@mui/material';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  maxWidth?: number | string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  maxWidth = 720,
}: SectionHeadingProps) {
  return (
    <Stack
      spacing={2}
      sx={{
        maxWidth,
        textAlign: align,
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {eyebrow ? <Typography variant="overline" color="secondary.main">{eyebrow}</Typography> : null}
      <Typography variant="h2" sx={{ fontSize: { xs: '2.4rem', md: '3.5rem' } }}>
        {title}
      </Typography>
      {description ? (
        <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.15rem' } }}>
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}
