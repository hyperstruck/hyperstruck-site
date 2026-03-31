import { FormEvent, useMemo, useState } from 'react';
import { Alert, Box, Button, Card, Stack, TextField, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { hasConfiguredSupabase, supabase } from '../../lib/supabaseClient';

interface WaitlistFormState {
  fullName: string;
  email: string;
}

const initialState: WaitlistFormState = {
  fullName: '',
  email: '',
};

export default function WaitlistFormCard() {
  const theme = useTheme();
  const [formState, setFormState] = useState<WaitlistFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const isPlaceholderConfig = useMemo(() => !hasConfiguredSupabase, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setIsError(false);

    if (!formState.fullName.trim() || !formState.email.trim()) {
      setIsError(true);
      setStatusMessage('Please provide both your full name and email address.');
      return;
    }

    if (isPlaceholderConfig) {
      setIsError(true);
      setStatusMessage(
        'Supabase placeholders are still configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable submissions.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('waitlist_signups').insert({
        full_name: formState.fullName.trim(),
        email: formState.email.trim().toLowerCase(),
        source: 'website-signup-page',
      });

      if (error) {
        setIsError(true);
        setStatusMessage(error.message);
        return;
      }

      setFormState(initialState);
      setStatusMessage("You're on the waitlist. We'll reach out soon.");
    } catch {
      setIsError(true);
      setStatusMessage('Unexpected error while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      sx={{
        px: { xs: 2.5, sm: 4 },
        py: { xs: 3, sm: 4 },
        borderColor: alpha(theme.palette.divider, 0.5),
        backgroundColor: alpha(theme.palette.background.paper, 0.75),
        backdropFilter: theme.custom.blur,
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Identity / Full Name"
            name="full_name"
            value={formState.fullName}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                fullName: event.target.value,
              }))
            }
            placeholder="ALEX MERCER"
            required
            fullWidth
            autoComplete="name"
          />
          <TextField
            label="Interface / Email Address"
            type="email"
            name="email"
            value={formState.email}
            onChange={(event) =>
              setFormState((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            placeholder="alex@network.io"
            required
            fullWidth
            autoComplete="email"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{
              mt: 1,
              py: 1.5,
              backgroundImage: theme.custom.gradients.primary,
              boxShadow: theme.custom.shadows.glow,
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Get Started'}
          </Button>
          {statusMessage ? (
            <Alert severity={isError ? 'error' : 'success'}>{statusMessage}</Alert>
          ) : null}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              textAlign: 'center',
            }}
          >
            By initializing, you accept the protocol terms.
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}
