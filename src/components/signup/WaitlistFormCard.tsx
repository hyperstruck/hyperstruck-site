import { FormEvent, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';

import { hasConfiguredSupabase, supabase } from '../../lib/supabaseClient';

interface WaitlistFormState {
  fullName: string;
  email: string;
  company: string;
  role: string;
  useCase: string;
}

const initialState: WaitlistFormState = {
  fullName: '',
  email: '',
  company: '',
  role: '',
  useCase: '',
};

const roles = [
  'Engineering Leader',
  'Software Engineer',
  'ML / AI Engineer',
  'Product Manager',
  'Founder / CTO',
  'Other',
];

export default function WaitlistFormCard() {
  const [formState, setFormState] = useState<WaitlistFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const isPlaceholderConfig = useMemo(() => !hasConfiguredSupabase, []);

  const handleChange = (field: keyof WaitlistFormState) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage(null);
    setIsError(false);

    if (!formState.fullName.trim() || !formState.email.trim()) {
      setIsError(true);
      setStatusMessage('Please provide your name and email address.');
      return;
    }

    if (isPlaceholderConfig) {
      setIsError(true);
      setStatusMessage(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable submissions.',
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('waitlist_signups').insert({
        full_name: formState.fullName.trim(),
        email: formState.email.trim().toLowerCase(),
        company: formState.company.trim() || null,
        role: formState.role || null,
        use_case: formState.useCase.trim() || null,
        source: 'website-signup-page',
      });

      if (error) {
        setIsError(true);
        setStatusMessage(error.message);
        return;
      }

      setFormState(initialState);
      setStatusMessage("You're on the list. We'll reach out soon.");
    } catch {
      setIsError(true);
      setStatusMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ p: { xs: 3, sm: 4 } }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Full name"
              name="full_name"
              value={formState.fullName}
              onChange={handleChange('fullName')}
              required
              fullWidth
              autoComplete="name"
            />
            <TextField
              label="Work email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange('email')}
              required
              fullWidth
              autoComplete="email"
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Company"
              name="company"
              value={formState.company}
              onChange={handleChange('company')}
              fullWidth
              autoComplete="organization"
            />
            <TextField
              label="Role"
              name="role"
              value={formState.role}
              onChange={handleChange('role')}
              select
              fullWidth
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <TextField
            label="What are you building? (optional)"
            name="use_case"
            value={formState.useCase}
            onChange={handleChange('useCase')}
            multiline
            rows={3}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ py: 1.5 }}
          >
            {isSubmitting ? 'Submitting...' : 'Request access'}
          </Button>
          {statusMessage ? (
            <Alert severity={isError ? 'error' : 'success'}>
              {statusMessage}
            </Alert>
          ) : null}
        </Stack>
      </Box>
    </Card>
  );
}
