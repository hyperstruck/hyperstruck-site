import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import TroubleshootRoundedIcon from '@mui/icons-material/TroubleshootRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import type { SvgIconComponent } from '@mui/icons-material';

export interface ArchitectureNode {
  title: string;
  description: string;
  placement: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export interface ValuePillar {
  title: string;
  description: string;
  icon: SvgIconComponent;
  accent: 'primary' | 'secondary' | 'tertiary';
  featured?: boolean;
}

export interface LearningModule {
  title: string;
  eyebrow: string;
  description: string;
  difference: string;
  icon: SvgIconComponent;
  animationVariant:
  | 'experiential'
  | 'confidence'
  | 'verification'
  | 'attribution'
  | 'conflict'
  | 'architecture';
  animationConcept: string;
  accent:
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'primarySoft'
  | 'secondarySoft'
  | 'tertiarySoft';
}

export interface CompatibilityItem {
  label: string;
  icon: SvgIconComponent;
  accent: 'primary' | 'secondary' | 'tertiary';
}

export interface PricingTier {
  name: string;
  label: string;
  description: string;
  price: string;
  subtext?: string;
  icon: SvgIconComponent;
  featureList: {
    label: string;
    icon: SvgIconComponent;
  }[];
  featured?: boolean;
}

export interface FeatureRow {
  capability: string;
  starter: string;
  pro: string;
  enterprise: string;
}

export const architectureNodes: ArchitectureNode[] = [
  {
    title: '85% vs 20%',
    description: 'Correct action when a known problem returns.',
    placement: 'topLeft',
  },
  {
    title: '84% vs 9%',
    description: 'Silent failures avoided across benchmark tasks.',
    placement: 'topRight',
  },
  {
    title: '92% vs 74%',
    description: 'Overall task quality with access to prior learnings.',
    placement: 'bottomLeft',
  },
  {
    title: '83% vs 17%',
    description: 'Correct ordering of operations in multi-step work.',
    placement: 'bottomRight',
  },
];

export const valuePillars: ValuePillar[] = [
  {
    title: 'Learning',
    description:
      'Hyperstruck turns execution into reusable operational intelligence so agents stop repeating the same mistakes and get better with experience.',
    icon: PsychologyAltRoundedIcon,
    accent: 'primary',
  },
  {
    title: 'Reasoning',
    description:
      'It improves how agents sequence actions, handle tradeoffs, and choose the next step under real operating conditions.',
    icon: RuleRoundedIcon,
    accent: 'secondary',
  },
  {
    title: 'Benchmarked Impact',
    description:
      'In benchmark runs across different domains, the same agent, same LLM, and same tools performed materially better when prior learnings were available.',
    icon: InsightsRoundedIcon,
    accent: 'tertiary',
    featured: true,
  },
  {
    title: 'Trust',
    description:
      'Learnings are strengthened, challenged, and reused with discipline so teams can trust what the system applies and why.',
    icon: SecurityRoundedIcon,
    accent: 'primary',
  },
  {
    title: 'Production Readiness',
    description:
      'More than an LLM wrapper, Hyperstruck adds an intelligence layer before generation, during execution, and after completion so future decisions improve.',
    icon: ApiRoundedIcon,
    accent: 'secondary',
  },
];

export const learningModules: LearningModule[] = [
  {
    title: 'Learning That Compounds',
    eyebrow: 'Agents that get better with experience.',
    description:
      'Hyperstruck captures what proved useful in execution, reinforces signals that keep working, and carries those lessons into future runs.',
    difference: 'Operational learning, not just retrieval.',
    icon: PsychologyAltRoundedIcon,
    animationVariant: 'experiential',
    animationConcept: 'Swarming memory particles that repeatedly converge into a stable path, showing raw executions becoming reusable intuition.',
    accent: 'primary',
  },
  {
    title: 'Better Judgment',
    eyebrow: 'Reasoning grounded in prior outcomes.',
    description:
      'The platform helps agents make structured decisions with better context, stronger sequencing, and fewer avoidable mistakes across complex work.',
    difference: 'Better judgment, not just more output.',
    icon: VerifiedRoundedIcon,
    animationVariant: 'confidence',
    animationConcept: 'A fluctuating signal ring that sharpens and brightens as evidence accumulates, representing confidence hardening over time.',
    accent: 'secondary',
  },
  {
    title: 'Silent Failure Prevention',
    eyebrow: 'Catch the miss before it compounds.',
    description:
      'Hyperstruck is designed to surface the constraints, prerequisites, and checks that reduce silent failures before they turn into bad downstream decisions.',
    difference: 'Prompt-only execution vs. disciplined decision quality.',
    icon: RuleRoundedIcon,
    animationVariant: 'verification',
    animationConcept: 'Layered gates that promote only certain data streams upward, visualizing proposed knowledge graduating into verified truth.',
    accent: 'tertiary',
  },
  {
    title: 'Attributable Improvement',
    eyebrow: 'Know what changed performance.',
    description:
      'Teams can see which learnings influenced execution and connect improved results to patterns that have already proven useful.',
    difference: 'Opaque behavior vs. measurable improvement.',
    icon: HistoryEduRoundedIcon,
    animationVariant: 'attribution',
    animationConcept: 'A live execution trace that leaves luminous breadcrumbs from output back to its originating decision chain.',
    accent: 'primarySoft',
  },
  {
    title: 'Conflict-Aware Learning',
    eyebrow: 'Do not reinforce stale or contradictory guidance.',
    description:
      'New evidence can challenge prior assumptions so agents do not blindly reuse old patterns when conditions have changed.',
    difference: 'Flat memory vs. disciplined learning.',
    icon: TroubleshootRoundedIcon,
    animationVariant: 'conflict',
    animationConcept: 'Two competing waveforms intersect and trigger a resolving pulse, representing contradiction detection and reconciliation.',
    accent: 'secondarySoft',
  },
  {
    title: 'Production-Ready Integration',
    eyebrow: 'Built for real systems, not demos.',
    description:
      'Use Hyperstruck through APIs, MCP, and developer workflows to add an intelligence layer that decides what matters before model calls, shapes execution during tasks, and captures what proved useful afterward.',
    difference: 'More than an LLM wrapper. A decision-quality layer around execution.',
    icon: SchemaRoundedIcon,
    animationVariant: 'architecture',
    animationConcept: 'Distinct orbital structures exchanging light between graph, vector, and tabular regions to suggest specialized memory systems working together.',
    accent: 'tertiarySoft',
  },
];

export const compatibilityItems: CompatibilityItem[] = [
  { label: 'API', icon: ApiRoundedIcon, accent: 'primary' },
  { label: 'MCP', icon: HubRoundedIcon, accent: 'secondary' },
  { label: 'Skills', icon: TerminalRoundedIcon, accent: 'tertiary' },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    label: 'Core Promise',
    description: 'Instant intelligence uplift',
    price: '$20 / month',
    subtext: 'Free credits included. No credit card required.',
    icon: AutoAwesomeRoundedIcon,
    featureList: [
      { label: '1 agent', icon: SmartToyRoundedIcon },
      { label: '1 GB knowledge storage', icon: StorageRoundedIcon },
      { label: '100 learnings', icon: InsightsRoundedIcon },
      { label: 'Unlimited application', icon: AllInclusiveRoundedIcon },
    ],
  },
  {
    name: 'Pro',
    label: 'Core Promise',
    description: 'Build domain-expert agents',
    price: '$299 / month',
    subtext: '+ $0.00005745 / sec of compute',
    icon: BoltRoundedIcon,
    featureList: [
      { label: 'Up to 30 agents', icon: SmartToyRoundedIcon },
      { label: 'Up to 10 GB knowledge storage', icon: StorageRoundedIcon },
      { label: '10,000 learnings + paid expansion', icon: InsightsRoundedIcon },
      { label: 'Unlimited application', icon: AllInclusiveRoundedIcon },
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    label: 'Core Promise',
    description: 'Turn agents into organizational intelligence',
    price: 'Contact us',
    icon: BusinessCenterRoundedIcon,
    featureList: [
      { label: 'Custom agents', icon: SmartToyRoundedIcon },
      { label: 'Custom knowledge storage', icon: StorageRoundedIcon },
      { label: 'Custom learnings', icon: InsightsRoundedIcon },
      { label: 'Unlimited application', icon: AllInclusiveRoundedIcon },
    ],
  },
];

export const featureRows: FeatureRow[] = [
  {
    capability: 'BYO LLM keys',
    starter: 'Yes',
    pro: 'Yes',
    enterprise: 'Yes',
  },
  {
    capability: 'Aggregated learning jobs',
    starter: 'N/A',
    pro: 'N/A',
    enterprise: 'Yes',
  },
  {
    capability: 'Compliance / governance',
    starter: 'N/A',
    pro: 'Purchasable add-on',
    enterprise: 'PII masking, OTEL format, prompt-injection prevention',
  },
  {
    capability: 'Learning depth',
    starter: 'Meaningful',
    pro: 'Stronger learning with domain specialization',
    enterprise: 'Aggregated learning across classes of agents',
  },
  {
    capability: 'Intelligent deduplication',
    starter: 'Basic',
    pro: 'Included',
    enterprise: 'Included + tunable',
  },
  {
    capability: 'Conflict resolution',
    starter: 'Not included',
    pro: 'Included',
    enterprise: 'Included + admin controls',
  },
  {
    capability: 'Domain expertise',
    starter: 'Limited',
    pro: 'Yes',
    enterprise: 'Advanced + organization-wide',
  },
  {
    capability: 'Learning fine-tuning',
    starter: 'N/A',
    pro: 'Limited defaults',
    enterprise: 'Full admin controls',
  },
  {
    capability: 'Embedding options',
    starter: 'Default platform models',
    pro: 'Larger models',
    enterprise: 'Highest-end / custom options',
  },
  {
    capability: 'Support',
    starter: 'Community / docs',
    pro: 'Standard',
    enterprise: 'Dedicated support + SLA',
  },
  {
    capability: 'Deployment',
    starter: 'Hosted',
    pro: 'Hosted',
    enterprise: 'Hosted or self-hosted',
  },
];

export const heroHighlights = [
  'Benchmarked across domains',
  'Same agent, same LLM, same tools',
  'Only difference: prior learnings',
  'Measurable decision gains',
] as const;

export const metrics = [
  {
    value: '85% vs 20%',
    label: 'Correct action taken on known problem types',
    icon: PsychologyAltRoundedIcon,
  },
  {
    value: '84% vs 9%',
    label: 'Avoidance of silent failures',
    icon: TroubleshootRoundedIcon,
  },
  {
    value: '92% vs 74%',
    label: 'Overall task quality',
    icon: VerifiedRoundedIcon,
  },
  {
    value: '83% vs 17%',
    label: 'Correct ordering of operations',
    icon: RuleRoundedIcon,
  },
  {
    value: '83% vs 13%',
    label: 'Effective strategy adoption',
    icon: InsightsRoundedIcon,
  },
] as const;
