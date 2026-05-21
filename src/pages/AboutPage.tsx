import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import PageMeta from '../components/PageMeta';

const team = [
  {
    name: 'Thomas Lynch',
    role: 'Co-founder',
    bio: 'Previously Senior Engineer at Relevance AI and Campaign Monitor. MSc in Computer Science specialising in data mining and knowledge discovery. Expertise in building agentic systems for enterprises, streaming systems at scale, and enterprise platform architecture.',
    linkedin: 'https://linkedin.com/in/tahlynch',
  },
  {
    name: 'Tony Truong',
    role: 'Co-founder',
    bio: 'Previously Principal Architect at Relevance AI, Head of Engineering at Neara, and BCG X Venture CTO. Deep technical expertise across compliance and security (ISO 27001, SOC2 Type II, GDPR), scaling systems and teams, and enterprise requirements for agentic systems.',
    linkedin: 'https://www.linkedin.com/in/truongt/',
  },
];

export default function AboutPage() {
  const theme = useTheme();

  return (
    <Box component="main">
      <PageMeta
        title="About"
        description="Meet the team behind Hyperstruck. We build the intelligence layer that makes AI agents learn from experience."
        path="/about"
      />
      <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 680 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.75rem', md: '4rem' }, mb: 4 }}
          >
            We build the intelligence layer that makes AI agents learn.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: '1.1rem', lineHeight: 1.85, mb: 3 }}
          >
            Most AI agent frameworks give agents memory but not learning.
            They can recall what happened but they do not change how they
            work. Every task starts from scratch. The same mistakes repeat.
            Useful patterns are lost.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: '1.1rem', lineHeight: 1.85, mb: 3 }}
          >
            We started Hyperstruck because we believed agents should get
            better with experience, the same way people do. Not through
            bigger models or fancier prompts, but through accumulated
            operational intelligence that compounds over time.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: '1.1rem', lineHeight: 1.85 }}
          >
            The result: the same model, with the same tools, delivers
            measurably better outcomes when it has access to learnings from
            prior work. We have the benchmarks to prove it.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            pt: { xs: 6, md: 8 },
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 5 }}>
            Team
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 4,
            }}
          >
            {team.map((person) => (
              <Box key={person.name}>
                <Typography variant="h4" sx={{ fontSize: '1.25rem', mb: 0.5 }}>
                  {person.name}
                </Typography>
                <Typography
                  color="primary.dark"
                  sx={{ fontSize: '0.9rem', fontWeight: 600, mb: 1.5 }}
                >
                  {person.role}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: '0.95rem', lineHeight: 1.75, mb: 1.5 }}
                >
                  {person.bio}
                </Typography>
                {person.linkedin ? (
                  <IconButton
                    component="a"
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener"
                    size="small"
                    sx={{ ml: -0.5, color: 'text.tertiary', '&:hover': { color: 'primary.dark' } }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            pt: { xs: 6, md: 8 },
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 3 }}>
            What we believe
          </Typography>

          <Stack spacing={3} sx={{ maxWidth: 680 }}>
            <Box>
              <Typography variant="h4" sx={{ fontSize: '1.1rem', mb: 1 }}>
                Model intelligence is a commodity. Agent intelligence compounds.
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                A smarter model starts fresh every time. An agent with
                accumulated learnings starts with a head start. We build the
                compounding layer.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontSize: '1.1rem', mb: 1 }}>
                Benchmarks or it did not happen.
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                We publish our methodology, our numbers, and our failure
                modes. If we cannot measure it, we do not claim it.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontSize: '1.1rem', mb: 1 }}>
                Build for all customers, not the demo.
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                Every feature works for any customer's tools and domains.
                We never anchor on specific use cases or fabricate values.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            mt: { xs: 8, md: 12 },
            pt: { xs: 6, md: 8 },
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 3 }}
          >
            Want to work with us?
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ maxWidth: 480, mx: 'auto', mb: 4, fontSize: '1.05rem', lineHeight: 1.75 }}
          >
            We are building the infrastructure for agents that learn. If
            that interests you, we would like to hear from you.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              size="large"
            >
              Request access
            </Button>
            <Button
              component="a"
              href="mailto:hello@hyperstruck.com"
              variant="outlined"
              size="large"
            >
              Get in touch
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
