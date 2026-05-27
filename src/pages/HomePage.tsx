import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import PageMeta from '../components/PageMeta';
import { benchmarkStats, features } from '../data/siteContent';
import { contactEmail } from '../theme/tokens';

const faqs = [
  {
    question: 'Is Hyperstruck just another LLM wrapper?',
    answer:
      'No. Hyperstruck is not a thin layer that simply forwards prompts to an LLM. A heavy amount of algorithmic processing, NLP, retrieval, ranking, filtering, planning, and orchestration happens before the model is called, so the agent receives the right context, constraints, and execution strategy. That makes the system more scalable, useful, and repeatable than a prompt wrapper sitting on top of a model.',
  },
  {
    question: "What's the difference between Learning and RAG or memory?",
    answer:
      'Memory is storage. RAG is retrieval. Both are useful, but neither is enough if the agent does not know when to use something, where it applies, or what to do with it. At large scale, similarity search across millions of documents can return duplicated, stale, or conflicting content, and the agent may never know. Hyperstruck Learning turns execution outcomes into reusable operational judgment, helping agents remember what worked, what failed, and how to approach similar work better next time.',
  },
  {
    question: 'How does Learning work?',
    answer:
      'Hyperstruck can extract useful lessons automatically from reasoning runs, then make those learnings available to future runs. Learnings can include prose plus structured evidence about specific observed outcomes, so they stay compact and reusable without storing raw logs. Teams can also inject, curate, search, retrieve, and reinforce learnings manually through the Learnings API.',
  },
  {
    question: "What's the benefit of using Hyperstruck reasoning over built-in thinking models?",
    answer:
      'Built-in thinking helps a model deliberate inside a single response. Hyperstruck reasoning manages the full lifecycle of agent work: plan, execute, reflect, revise, and learn. It also coordinates tools, retries, dependencies, approval gates, and accumulated learnings across runs, so the same model and tools can produce better outcomes over time.',
  },
  {
    question: 'How can my organization benefit from Hyperstruck Learning?',
    answer:
      'Your agents stop starting from zero. Teams can capture hard-won operational knowledge, reduce repeated mistakes, improve recurring workflows, and build domain-specialized agents whose judgment compounds with use. For larger teams, that means institutional knowledge becomes available to future agent work instead of staying trapped in one-off runs, individuals, or chat history.',
  },
] as const;

const problemSolutions = [
  {
    problem: 'Agents repeat the same mistakes',
    solution:
      'Hyperstruck captures useful lessons from each run so known failure modes do not happen again.',
  },
  {
    problem: 'Context gets re-explained every time',
    solution:
      'Hyperstruck carries forward operational knowledge so agents can start future work with relevant experience.',
  },
  {
    problem: 'Memory and RAG return information, not judgment',
    solution:
      'Hyperstruck helps agents understand when prior knowledge applies and how to use it.',
  },
  {
    problem: 'Expert knowledge stays trapped in people and chats',
    solution:
      'Hyperstruck turns successful patterns into reusable organizational intelligence.',
  },
] as const;

function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: { xs: 8, md: 14 },
        pb: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 780 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.5rem' },
              mb: 3,
            }}
          >
            Your agent's next run should be better than its first.
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: '1.05rem', md: '1.2rem' },
              lineHeight: 1.75,
              maxWidth: 620,
              mb: 5,
            }}
          >
            Hyperstruck makes AI agents better with experience. Your teams
            spend less time fixing repeated mistakes, re-explaining context,
            and rebuilding hard-won knowledge, because every run can improve
            the next one.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
            <Button
              component={RouterLink}
              to="/signup"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
            >
              Request access
            </Button>
            <Button
              component={RouterLink}
              to="/docs"
              variant="outlined"
              size="large"
              sx={{ borderColor: theme.palette.divider }}
            >
              Read the docs
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function ProblemSolutionSection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 680, mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2 }}
          >
            AI agents should not start from scratch every time
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
            Most agent stacks remember information, but they do not reliably
            turn experience into better execution. Hyperstruck gives teams a
            compounding layer for agent judgment.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {problemSolutions.map((item) => (
            <Card
              key={item.problem}
              sx={{
                p: { xs: 3, md: 4 },
                borderTop: `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontSize: '1.15rem', mb: 1.5 }}
              >
                {item.problem}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: '0.95rem', lineHeight: 1.75 }}
              >
                {item.solution}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function ProofSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 5, md: 8 },
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 3 }}
            >
              Benchmark-proven across domains
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: '1.05rem', lineHeight: 1.8, mb: 2 }}
            >
              In controlled benchmark runs, the same agent with the same LLM
              and the same tools performed materially better when it had
              access to learnings from prior executions. The only variable
              was accumulated experience.
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: '0.95rem', lineHeight: 1.7 }}
            >
              On SWE-bench Verified, our agent resolved 45.8% of bugs using
              llama-3.3-70b at $0.08 per fix, outperforming GPT-4o at 33.2%.
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                display: 'grid',
                gap: 0,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 100px',
                  px: 2.5,
                  py: 1.5,
                  backgroundColor: theme.palette.background.default,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography
                  sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'text.tertiary', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  Metric
                </Typography>
                <Typography
                  sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'primary.dark', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}
                >
                  With
                </Typography>
                <Typography
                  sx={{ fontSize: '0.75rem', fontWeight: 600, color: 'text.tertiary', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}
                >
                  Without
                </Typography>
              </Box>
              {benchmarkStats.map((stat, i) => (
                <Box
                  key={stat.label}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100px 100px',
                    px: 2.5,
                    py: 2,
                    borderBottom:
                      i < benchmarkStats.length - 1
                        ? `1px solid ${theme.palette.divider}`
                        : 'none',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '0.9rem', color: 'text.primary' }}>
                    {stat.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      fontFamily: '"JetBrains Mono", monospace',
                      color: 'primary.dark',
                      textAlign: 'right',
                    }}
                  >
                    {stat.withLearnings}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.95rem',
                      fontFamily: '"JetBrains Mono", monospace',
                      color: 'text.tertiary',
                      textAlign: 'right',
                    }}
                  >
                    {stat.without}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography
              sx={{
                mt: 1.5,
                fontSize: '0.8rem',
                color: 'text.tertiary',
                textAlign: 'center',
              }}
            >
              Same agent, same LLM, same tools. Only difference: prior learnings.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function FeaturesSection() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 560, mb: { xs: 5, md: 7 } }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2 }}
          >
            How it works
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
            Use Hyperstruck as your full agent runtime, bring agents from
            LangGraph, OpenAI Agents SDK, or CrewAI, or work directly from
            Claude Code and Cursor with built-in skills.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {features.map((feature) => (
            <Card
              key={feature.title}
              sx={{
                p: { xs: 3, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                borderTop: `2px solid ${theme.palette.primary.main}`,
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontSize: '1.15rem', mb: 2 }}
              >
                {feature.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: '0.95rem', lineHeight: 1.75 }}
              >
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function VideoSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.paper',
        borderTop: `1px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2 }}
          >
            See it in action
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1.05rem' }}>
            A live walkthrough of agents learning from software development tasks.
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            component="iframe"
            title="Hyperstruck product demo"
            src="https://www.youtube-nocookie.com/embed/Bh1vJBJJNCE"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            sx={{
              display: 'block',
              width: '100%',
              aspectRatio: '16 / 9',
              border: 0,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

function FaqSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 2 }}
          >
            Frequently asked questions
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: '1.05rem', lineHeight: 1.75, mx: 'auto', maxWidth: 620 }}
          >
            Clear answers on how Hyperstruck reasoning and learning differ from
            wrappers, memory, and retrieval-only systems.
          </Typography>
        </Box>

        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          }}
        >
          {faqs.map((faq, index) => (
            <Accordion
              key={faq.question}
              disableGutters
              elevation={0}
              sx={{
                backgroundColor: 'transparent',
                borderBottom:
                  index < faqs.length - 1
                    ? `1px solid ${theme.palette.divider}`
                    : 'none',
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreRoundedIcon />}
                aria-controls={`faq-${index}-content`}
                id={`faq-${index}-header`}
                sx={{
                  px: { xs: 2.5, md: 3 },
                  py: 1,
                  '& .MuiAccordionSummary-content': {
                    my: 1.5,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2.5, md: 3 }, pt: 0, pb: 3 }}>
                <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function CtaSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 14 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 3 }}
        >
          Build agents that improve with experience
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            maxWidth: 560,
            mx: 'auto',
            mb: 5,
            fontSize: '1.1rem',
            lineHeight: 1.75,
          }}
        >
          Hyperstruck is built for teams that want more than raw model output.
          Request access and we will help you get started.
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
            href={`mailto:${contactEmail}?subject=Hyperstruck%20demo%20request`}
            variant="outlined"
            size="large"
          >
            Talk to an engineer
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default function HomePage() {
  return (
    <Box component="main">
      <PageMeta
        title="Hyperstruck"
        description="Hyperstruck makes AI agents better with experience by carrying forward what works and turning every run into compounding operational intelligence."
        path="/"
      />
      <HeroSection />
      <ProblemSolutionSection />
      <ProofSection />
      <FeaturesSection />
      <VideoSection />
      <FaqSection />
      <CtaSection />
    </Box>
  );
}
