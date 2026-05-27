import {
  Box,
  Button,
  Card,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PageMeta from '../components/PageMeta';

type Metric = {
  label: string;
  value: string;
};

type Signal = {
  label: string;
  detail: string;
};

type TourStep = {
  title: string;
  description: string;
  takeaway: string;
  metrics: Metric[];
  beforeTitle: string;
  beforeItems: string[];
  afterTitle: string;
  afterItems: string[];
  signals: Signal[];
};

type UseCaseTour = {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  outcome: string;
  steps: TourStep[];
};

const useCases: UseCaseTour[] = [
  {
    id: 'legal',
    eyebrow: 'Legal operations',
    title: 'DPA review that remembers prior negotiations',
    summary:
      'Turn vendor agreements, historical redlines, and prior privacy decisions into targeted contract actions.',
    outcome:
      'Legal teams move from generic clause spotting to specific risk decisions with evidence behind each recommendation.',
    steps: [
      {
        title: 'Vendor DPA arrives',
        description:
          'A new data processing agreement is uploaded with retention, subprocessors, cross-region support, audit evidence, and liability terms.',
        takeaway:
          'The work starts like a normal review, but Hyperstruck prepares the document for targeted matching before the LLM drafts recommendations.',
        metrics: [
          { label: 'Document', value: '20 pages' },
          { label: 'Clauses extracted', value: '37' },
          { label: 'Review mode', value: 'Learning-aware' },
        ],
        beforeTitle: 'Generic review',
        beforeItems: [
          'Find risky clauses',
          'Summarize vendor obligations',
          'Ask counsel to check edge cases',
        ],
        afterTitle: 'Hyperstruck review',
        afterItems: [
          'Extract operational triggers',
          'Match against prior matters',
          'Rank clauses by known impact',
        ],
        signals: [
          {
            label: 'Detected trigger',
            detail: 'Subprocessor retention and cross-region support both affect privacy approval.',
          },
          {
            label: 'Processing layer',
            detail: 'Clause extraction, ranking, filtering, and retrieval happen before generation.',
          },
        ],
      },
      {
        title: 'Generic output becomes targeted action',
        description:
          'A standard agent gives broad review notes. Hyperstruck uses matched learnings to produce actions the operator can apply.',
        takeaway:
          'The difference is not prettier wording. The difference is knowing which recommendation matters for this vendor, this clause, and this organization.',
        metrics: [
          { label: 'Matched matters', value: '42' },
          { label: 'Evidence hits', value: '184' },
          { label: 'Confidence', value: '0.91' },
        ],
        beforeTitle: 'Generic recommendations',
        beforeItems: [
          'Review liability cap for reasonableness',
          'Ask vendor to clarify retention period',
          'Confirm subprocessors are listed',
        ],
        afterTitle: 'Hyperstruck actions',
        afterItems: [
          'Fix liability cap to no more than 3x contract value',
          'Require 30-day retention floor for downstream subprocessors',
          'Route cross-region support path to privacy counsel',
        ],
        signals: [
          {
            label: 'Matched learning',
            detail: 'Liability caps above 3x contract value created unrecoverable vendor exit exposure.',
          },
          {
            label: 'Operator action',
            detail: 'Each recommendation can become an approval, escalation, redline, or checklist item.',
          },
        ],
      },
      {
        title: 'Review becomes organizational knowledge',
        description:
          'The decision, evidence, and result feed future contract reviews instead of disappearing into a matter file.',
        takeaway:
          'Legal judgment becomes reusable. The next DPA starts with what the organization already learned.',
        metrics: [
          { label: 'Reusable learnings', value: '3' },
          { label: 'Future trigger', value: 'Auto-match' },
          { label: 'Raw logs stored', value: 'No' },
        ],
        beforeTitle: 'After the review',
        beforeItems: [
          'Decision lives in email or matter notes',
          'Next reviewer repeats the same analysis',
          'Prior context must be re-explained',
        ],
        afterTitle: 'After Hyperstruck',
        afterItems: [
          'Learning stores the trigger, action, confidence, and evidence',
          'Future DPAs retrieve the decision at the right moment',
          'Conflicting new evidence can qualify the old rule',
        ],
        signals: [
          {
            label: 'Learning shape',
            detail: 'Trigger condition, operational rule, source, confidence, and evidence count.',
          },
          {
            label: 'Business value',
            detail: 'The team reduces repeated review effort while preserving the reason behind each rule.',
          },
        ],
      },
    ],
  },
  {
    id: 'security',
    eyebrow: 'Security and compliance',
    title: 'Ticket triage that understands prior risk',
    summary:
      'Rank incoming security and compliance tickets using organizational evidence, not keyword matching.',
    outcome:
      'Analysts focus on the tickets that carry real customer, audit, or policy exposure.',
    steps: [
      {
        title: 'A mixed queue arrives',
        description:
          'SOC 2 exceptions, SSO questions, audit exports, and deletion certificates all land in the same queue.',
        takeaway:
          'Generic routing treats tickets as text. Hyperstruck treats them as operational situations with prior outcomes.',
        metrics: [
          { label: 'Tickets/month', value: '1,284' },
          { label: 'Auto-triaged', value: '94%' },
          { label: 'Review queue', value: '73' },
        ],
        beforeTitle: 'Generic triage',
        beforeItems: [
          'Route by labels and scary words',
          'Escalate obvious security terms',
          'Leave analysts to inspect context',
        ],
        afterTitle: 'Hyperstruck triage',
        afterItems: [
          'Extract policy exposure',
          'Match prior exceptions and outcomes',
          'Score risk using evidence and confidence',
        ],
        signals: [
          {
            label: 'Focused ticket',
            detail: 'Customer wants production data shared with a subprocessed analytics vendor before DPA approval.',
          },
          {
            label: 'Key distinction',
            detail: 'The ticket is escalated because prior evidence matches, not because words look alarming.',
          },
        ],
      },
      {
        title: 'Prior evidence changes the risk score',
        description:
          'Hyperstruck finds that similar exceptions became audit remediation and customer-facing compliance risk.',
        takeaway:
          'The system knows what happened last time, which controls were missing, and why this ticket deserves human review.',
        metrics: [
          { label: 'Risk score', value: '91/100' },
          { label: 'Learning match', value: '0.94' },
          { label: 'Evidence hits', value: '3' },
        ],
        beforeTitle: 'Without learnings',
        beforeItems: [
          'Mark as high priority by broad category',
          'Ask analyst to inspect the vendor path',
          'Risk explanation remains subjective',
        ],
        afterTitle: 'With Hyperstruck',
        afterItems: [
          'Block automated approval',
          'Route to privacy counsel',
          'Require compensating controls and expiry date',
        ],
        signals: [
          {
            label: 'Pitfall learning',
            detail: 'Production data sharing before DPA approval must be blocked and escalated.',
          },
          {
            label: 'Prerequisite learning',
            detail: 'Security exceptions need controls, expiry date, and a named evidence owner.',
          },
        ],
      },
      {
        title: 'Triage becomes repeatable',
        description:
          'Resolved tickets reinforce which signals mattered and which recommendations prevented rework.',
        takeaway:
          'Compliance teams get faster without flattening risk into a generic automation rule.',
        metrics: [
          { label: 'Analyst hours saved', value: '214h' },
          { label: 'Evidence owner', value: 'Required' },
          { label: 'Audit risk', value: 'Reduced' },
        ],
        beforeTitle: 'Manual follow-up',
        beforeItems: [
          'Decision depends on who is on call',
          'Evidence ownership gets missed',
          'Similar tickets drift over time',
        ],
        afterTitle: 'Learning loop',
        afterItems: [
          'Outcome updates future risk scoring',
          'Required evidence becomes part of the workflow',
          'Escalation rules improve with proof',
        ],
        signals: [
          {
            label: 'Outcome pattern',
            detail: 'SOC 2 exceptions often become audit findings when evidence ownership is missing.',
          },
          {
            label: 'Governance value',
            detail: 'The organization can explain why a ticket was routed, blocked, or approved.',
          },
        ],
      },
    ],
  },
  {
    id: 'sdlc',
    eyebrow: 'Agentic SDLC',
    title: 'Software agents that inherit senior-engineer judgment',
    summary:
      'Make coding agents remember the failure modes, constraints, and production lessons your team already learned.',
    outcome:
      'The same coding task produces safer plans, stronger tests, and fewer repeated production mistakes.',
    steps: [
      {
        title: 'The first pass looks correct',
        description:
          'A coding agent is asked to delete a folder and its files. The obvious implementation deletes rows and returns success.',
        takeaway:
          'Most agent failures are polished, plausible, and missing the constraint a senior engineer would have caught.',
        metrics: [
          { label: 'Prompt detail', value: 'Ordinary' },
          { label: 'Hidden risk', value: 'Bulk delete' },
          { label: 'Guardrails', value: 'Missing' },
        ],
        beforeTitle: 'Standard agent plan',
        beforeItems: [
          'Delete folder',
          'Delete child files',
          'Return success',
        ],
        afterTitle: 'What experience notices',
        afterItems: [
          'Large folders can lock tables',
          'Destructive actions need audit trails',
          'Failure paths need ownership and tests',
        ],
        signals: [
          {
            label: 'Institutional memory',
            detail: 'Agents can write code, but they do not remember why your team stopped writing it that way.',
          },
          {
            label: 'Risk pattern',
            detail: 'The problem is not code generation. It is missing operational judgment.',
          },
        ],
      },
      {
        title: 'A retrieved pitfall changes the plan',
        description:
          'Hyperstruck recognizes the destructive bulk operation and retrieves a prior lesson about unbounded deletes.',
        takeaway:
          'The second pass is better because the agent starts with relevant experience, not because the prompt got longer.',
        metrics: [
          { label: 'Prior incident', value: '12m lock' },
          { label: 'Threshold', value: 'Preflight' },
          { label: 'Strategy', value: 'Batch or job' },
        ],
        beforeTitle: 'Without the pitfall',
        beforeItems: [
          'Run one delete operation',
          'Assume the operation completes',
          'Add happy-path tests',
        ],
        afterTitle: 'With Hyperstruck',
        afterItems: [
          'Estimate row count first',
          'Use bounded batch deletion above threshold',
          'Hand off large folders to background jobs',
        ],
        signals: [
          {
            label: 'Retrieved learning',
            detail: 'Unbounded bulk deletes on large tables cause extended locks and timeouts.',
          },
          {
            label: 'Applied judgment',
            detail: 'Ownership verification, audit logging, and failure-path tests move into the plan.',
          },
        ],
      },
      {
        title: 'The team stops relearning the same lesson',
        description:
          'The implementation outcome reinforces the learning and makes the safer pattern available to future agents.',
        takeaway:
          'Hyperstruck turns what the senior engineer would have caught into a reusable system behavior.',
        metrics: [
          { label: 'Repeated mistake', value: 'Stopped' },
          { label: 'Plan trace', value: 'Explainable' },
          { label: 'Future tasks', value: 'Informed' },
        ],
        beforeTitle: 'Tomorrow without learning',
        beforeItems: [
          'Paste context again',
          'Warn about bulk deletes again',
          'Review the same failure mode again',
        ],
        afterTitle: 'Tomorrow with Hyperstruck',
        afterItems: [
          'Relevant pitfall appears before planning',
          'The agent applies the safer pattern',
          'The plan explains what changed and why',
        ],
        signals: [
          {
            label: 'SDLC value',
            detail: 'The agent improves across tasks without depending on a bigger model or constant prompt tuning.',
          },
          {
            label: 'Team value',
            detail: 'Production lessons move from people and chats into the agent workflow.',
          },
        ],
      },
    ],
  },
  {
    id: 'outreach',
    eyebrow: 'Revenue operations',
    title: 'BDR agents that learn what earns attention',
    summary:
      'Turn campaign outcomes into better targeting, messaging, and follow-up behavior for outreach agents.',
    outcome:
      'Outreach improves as the agent learns which hooks, segments, and sequences produce replies and clicks.',
    steps: [
      {
        title: 'The first sequence is generic',
        description:
          'A BDR agent launches a broad campaign using firmographic data, a value proposition, and standard follow-up timing.',
        takeaway:
          'Most outreach agents can send. The hard part is learning which message works for which buyer and when to stop repeating weak patterns.',
        metrics: [
          { label: 'Prospects', value: '1,200' },
          { label: 'Initial CTR', value: '2.1%' },
          { label: 'Reply rate', value: '0.8%' },
        ],
        beforeTitle: 'Generic campaign',
        beforeItems: [
          'Use one value proposition',
          'Personalize with company facts',
          'Follow a fixed cadence',
        ],
        afterTitle: 'Learning-ready campaign',
        afterItems: [
          'Track hook, persona, pain, and timing',
          'Connect clicks and replies to message patterns',
          'Flag segments with weak engagement',
        ],
        signals: [
          {
            label: 'Observed pattern',
            detail: 'Security leaders click compliance-risk messaging more often than productivity messaging.',
          },
          {
            label: 'Bad pattern',
            detail: 'Long implementation claims create opens but few replies.',
          },
        ],
      },
      {
        title: 'Outcomes become usable learning',
        description:
          'Hyperstruck separates noisy activity from behavior-changing evidence, then applies it to the next campaign.',
        takeaway:
          'The agent does not just remember the last email. It learns which outreach decision should change.',
        metrics: [
          { label: 'Winning hook', value: 'Risk' },
          { label: 'Weak segment', value: 'Ops only' },
          { label: 'Evidence', value: '5 sends' },
        ],
        beforeTitle: 'Without learning',
        beforeItems: [
          'Report opens and clicks',
          'Ask a human to infer what changed',
          'Reuse messaging until someone edits it',
        ],
        afterTitle: 'With Hyperstruck',
        afterItems: [
          'Promote hooks with reply evidence',
          'Suppress claims that create low-quality clicks',
          'Adapt follow-ups by segment and objection',
        ],
        signals: [
          {
            label: 'Learning example',
            detail: 'For compliance personas, lead with audit exposure and evidence ownership before efficiency claims.',
          },
          {
            label: 'Scale issue',
            detail: 'At thousands of prospects, raw memory is not enough. The agent needs to know what to use and when.',
          },
        ],
      },
      {
        title: 'The next campaign starts stronger',
        description:
          'The agent uses proven hooks, avoids stale messaging, and explains why the sequence changed.',
        takeaway:
          'BDR performance compounds because the agent carries forward what the market already taught it.',
        metrics: [
          { label: 'Next CTR', value: '4.7%' },
          { label: 'Reply quality', value: '+38%' },
          { label: 'Bad hooks', value: 'Suppressed' },
        ],
        beforeTitle: 'Static outreach',
        beforeItems: [
          'Same sequence repeats',
          'Learning stays in dashboards',
          'Stale claims keep circulating',
        ],
        afterTitle: 'Compounding outreach',
        afterItems: [
          'Sequence changes based on outcome evidence',
          'Winning patterns become reusable guidance',
          'The agent stops repeating weak messaging',
        ],
        signals: [
          {
            label: 'Business value',
            detail: 'Higher click-through is useful, but the durable win is an outreach system that improves with each campaign.',
          },
          {
            label: 'Operator control',
            detail: 'Revenue teams can curate, reinforce, or retire learnings as markets and messaging change.',
          },
        ],
      },
    ],
  },
];

const firstStepIndex = 0;

function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
        gap: 1.5,
      }}
    >
      {metrics.map((metric) => (
        <Box
          key={metric.label}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1.5,
            backgroundColor: 'background.default',
            p: 2,
          }}
        >
          <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            {metric.value}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '0.78rem' }}>
            {metric.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function ComparisonCard({
  title,
  items,
  highlighted,
}: {
  title: string;
  items: string[];
  highlighted?: boolean;
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 2.5,
        borderColor: highlighted ? theme.palette.primary.main : theme.palette.divider,
        backgroundColor: highlighted ? 'primary.light' : 'background.paper',
        boxShadow: 'none',
      }}
    >
      <Typography variant="h4" sx={{ fontSize: '1rem', mb: 2 }}>
        {title}
      </Typography>
      <Stack spacing={1.25}>
        {items.map((item) => (
          <Typography
            key={item}
            color={highlighted ? 'text.primary' : 'text.secondary'}
            sx={{
              fontSize: '0.9rem',
              lineHeight: 1.55,
              pl: 2,
              position: 'relative',
              '&::before': {
                content: '"-"',
                position: 'absolute',
                left: 0,
                color: highlighted ? 'primary.dark' : 'text.tertiary',
              },
            }}
          >
            {item}
          </Typography>
        ))}
      </Stack>
    </Card>
  );
}

function SignalList({ signals }: { signals: Signal[] }) {
  return (
    <Stack spacing={1.5}>
      {signals.map((signal) => (
        <Box
          key={signal.label}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1.5,
            backgroundColor: 'background.paper',
            p: 2,
          }}
        >
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: 'primary.dark', mb: 0.75 }}>
            {signal.label}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
            {signal.detail}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

function UseCaseSelector({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 1.5,
      }}
    >
      {useCases.map((useCase) => {
        const selected = useCase.id === activeId;

        return (
          <Button
            key={useCase.id}
            onClick={() => onSelect(useCase.id)}
            variant={selected ? 'contained' : 'outlined'}
            sx={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              textAlign: 'left',
              p: 2,
              minHeight: 112,
              whiteSpace: 'normal',
            }}
          >
            <Box>
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: selected ? 0.85 : 0.65,
                  mb: 0.75,
                }}
              >
                {useCase.eyebrow}
              </Typography>
              <Typography component="span" sx={{ display: 'block', fontSize: '0.95rem', lineHeight: 1.35 }}>
                {useCase.title}
              </Typography>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
}

function GuidedTour({
  useCase,
  stepIndex,
  onStepChange,
}: {
  useCase: UseCaseTour;
  stepIndex: number;
  onStepChange: (nextStep: number) => void;
}) {
  const theme = useTheme();
  const step = useCase.steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === useCase.steps.length - 1;

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
          p: { xs: 2.5, md: 3 },
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ maxWidth: 760 }}>
          <Chip
            label={useCase.eyebrow}
            size="small"
            sx={{ mb: 1.5, backgroundColor: 'primary.light', color: 'primary.dark', fontWeight: 700 }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.35rem' }, mb: 1.5 }}>
            {useCase.title}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1rem', lineHeight: 1.75 }}>
            {useCase.summary}
          </Typography>
        </Box>
        <Box sx={{ minWidth: 180 }}>
          <Typography
            color="text.tertiary"
            sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}
          >
            Stage
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: '1.5rem', fontWeight: 800 }}>
            {stepIndex + 1}/{useCase.steps.length}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 340px' },
        }}
      >
        <Box sx={{ p: { xs: 2.5, md: 3 }, backgroundColor: 'background.default' }}>
          <Box
            key={`${useCase.id}-${step.title}`}
            sx={{
              display: 'grid',
              gap: 2.5,
              animation: 'tourFade 220ms ease',
              '@keyframes tourFade': {
                from: { opacity: 0, transform: 'translateY(6px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.35rem', md: '1.7rem' }, mb: 1 }}>
                {step.title}
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75, maxWidth: 760 }}>
                {step.description}
              </Typography>
            </Box>

            <MetricStrip metrics={step.metrics} />

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 2,
              }}
            >
              <ComparisonCard title={step.beforeTitle} items={step.beforeItems} />
              <ComparisonCard title={step.afterTitle} items={step.afterItems} highlighted />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: { xs: 2.5, md: 3 },
            borderTop: { xs: `1px solid ${theme.palette.divider}`, lg: 'none' },
            borderLeft: { xs: 'none', lg: `1px solid ${theme.palette.divider}` },
            backgroundColor: 'background.paper',
          }}
        >
          <Stack spacing={2.5}>
            <Box>
              <Typography
                color="text.tertiary"
                sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', mb: 1 }}
              >
                Key takeaway
              </Typography>
              <Typography sx={{ fontSize: '1.05rem', lineHeight: 1.7, fontWeight: 600 }}>
                {step.takeaway}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography
                color="text.tertiary"
                sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', mb: 1.5 }}
              >
                Signals used
              </Typography>
              <SignalList signals={step.signals} />
            </Box>

            <Divider />

            <Box>
              <Typography
                color="text.tertiary"
                sx={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', mb: 1 }}
              >
                Outcome
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                {useCase.outcome}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 2,
          p: { xs: 2.5, md: 3 },
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" spacing={1}>
          {useCase.steps.map((tourStep, index) => (
            <Box
              key={tourStep.title}
              aria-label={`Step ${index + 1}`}
              sx={{
                width: index === stepIndex ? 32 : 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: index === stepIndex ? 'primary.main' : 'divider',
                transition: 'width 180ms ease, background-color 180ms ease',
              }}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            disabled={isFirstStep}
            onClick={() => onStepChange(stepIndex - 1)}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={() => onStepChange(isLastStep ? firstStepIndex : stepIndex + 1)}
          >
            {isLastStep ? 'Restart tour' : 'Next'}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

export default function UseCasesPage() {
  const [activeUseCaseId, setActiveUseCaseId] = useState(useCases[0].id);
  const [stepIndex, setStepIndex] = useState(firstStepIndex);

  const activeUseCase = useMemo(
    () => useCases.find((useCase) => useCase.id === activeUseCaseId) ?? useCases[0],
    [activeUseCaseId],
  );

  const handleSelectUseCase = (id: string) => {
    setActiveUseCaseId(id);
    setStepIndex(firstStepIndex);
  };

  return (
    <Box component="main">
      <PageMeta
        title="Use Cases"
        description="Explore guided Hyperstruck use cases for legal workflows, security triage, agentic software development, and outreach agents that learn from results."
        path="/use-cases"
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 7, md: 10 }, pb: { xs: 8, md: 12 } }}>
        <Box sx={{ maxWidth: 760, mx: 'auto', textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Chip
            label="Guided tours"
            size="small"
            sx={{
              mb: 3,
              backgroundColor: 'primary.light',
              color: 'primary.dark',
              fontWeight: 700,
            }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.75rem', md: '4.25rem' }, mb: 2 }}>
            See how agent learning changes real workflows
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.75 }}
          >
            Walk through practical examples where Hyperstruck turns prior
            outcomes into better decisions, safer actions, and workflows that
            improve with every run.
          </Typography>
        </Box>

        <Stack spacing={{ xs: 3, md: 4 }}>
          <UseCaseSelector activeId={activeUseCase.id} onSelect={handleSelectUseCase} />
          <GuidedTour
            useCase={activeUseCase}
            stepIndex={stepIndex}
            onStepChange={setStepIndex}
          />
        </Stack>

        <Box
          sx={{
            mt: { xs: 8, md: 10 },
            p: { xs: 3, md: 5 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, mb: 2 }}>
            Have a workflow that should get smarter every time?
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 620, mx: 'auto', mb: 4, lineHeight: 1.75 }}>
            Hyperstruck can apply the same reasoning and learning loop to your
            agents, tools, policies, and domain-specific decisions.
          </Typography>
          <Button component={RouterLink} to="/signup" variant="contained" size="large">
            Request access
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
