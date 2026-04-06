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
    title: 'Node: MCP',
    description: 'Fetching remote contexts...',
    placement: 'topLeft',
  },
  {
    title: 'Node: APIs',
    description: 'Any endpoint, any system.',
    placement: 'topRight',
  },
  {
    title: 'Node: Agent Skills',
    description: 'Native workflows and execution.',
    placement: 'bottomLeft',
  },
  {
    title: 'Node: Sub Agents',
    description: 'Distributed reasoning at speed.',
    placement: 'bottomRight',
  },
];

export const valuePillars: ValuePillar[] = [
  {
    title: 'Persistent Memory',
    description:
      'Long-term contextual awareness that evolves with every interaction, creating a truly personalized intelligence layer.',
    icon: MemoryRoundedIcon,
    accent: 'primary',
  },
  {
    title: 'Real Learning',
    description:
      'Dynamic adaptation to your specific business logic and communication style in real-time.',
    icon: PsychologyAltRoundedIcon,
    accent: 'secondary',
  },
  {
    title: 'Domain Expertise',
    description:
      'Out-of-the-box mastery across specialized sectors including Fintech, Legal, and Deep Tech Engineering.',
    icon: ArchitectureRoundedIcon,
    accent: 'tertiary',
    featured: true,
  },
  {
    title: 'Trust and Control',
    description:
      'Enterprise-grade security with granular visibility into every decision made by your AI workforce.',
    icon: SecurityRoundedIcon,
    accent: 'primary',
  },
  {
    title: 'Quality Output',
    description:
      'High-fidelity results that maintain brand voice and technical accuracy without hallucination.',
    icon: BoltRoundedIcon,
    accent: 'secondary',
  },
];

export const learningModules: LearningModule[] = [
  {
    title: 'Experiential Intelligence',
    eyebrow: 'Not just storage. Evolution.',
    description:
      'Most AI systems remember specific conversations. Hyperstruck synthesizes patterns from thousands of runs to build a generalized intuition for your stack.',
    difference: 'Others retrieve documents. We extract experience.',
    icon: PsychologyAltRoundedIcon,
    animationVariant: 'experiential',
    animationConcept: 'Swarming memory particles that repeatedly converge into a stable path, showing raw executions becoming reusable intuition.',
    accent: 'primary',
  },
  {
    title: 'Confidence That Matures',
    eyebrow: 'Knowledge that proves itself.',
    description:
      'Every insight in Hyperstruck is assigned a dynamic confidence score based on historical performance and source reliability.',
    difference: 'Static embeddings vs. self-validating expertise.',
    icon: VerifiedRoundedIcon,
    animationVariant: 'confidence',
    animationConcept: 'A fluctuating signal ring that sharpens and brightens as evidence accumulates, representing confidence hardening over time.',
    accent: 'secondary',
  },
  {
    title: 'Trust Levels & Verification',
    eyebrow: 'Not all knowledge deserves equal weight.',
    description:
      'Hyperstruck understands that insight requires validation. Our system partitions proposed knowledge from verified, production-ready intelligence.',
    difference: 'Flat retrieval vs. verified, tiered intelligence.',
    icon: RuleRoundedIcon,
    animationVariant: 'verification',
    animationConcept: 'Layered gates that promote only certain data streams upward, visualizing proposed knowledge graduating into verified truth.',
    accent: 'tertiary',
  },
  {
    title: 'Attribution & Accountability',
    eyebrow: 'Close the loop. Know what works.',
    description:
      'When Hyperstruck applies past learnings, it cites the exact historical execution path that justifies the current decision.',
    difference: 'Blind suggestions vs. attributable, measurable impact.',
    icon: HistoryEduRoundedIcon,
    animationVariant: 'attribution',
    animationConcept: 'A live execution trace that leaves luminous breadcrumbs from output back to its originating decision chain.',
    accent: 'primarySoft',
  },
  {
    title: 'Conflict Detection',
    eyebrow: 'Smart enough to spot contradictions.',
    description:
      'Real learning means updating beliefs. Core automatically identifies when new observations conflict with existing memory and triggers resolution logic.',
    difference: 'Dumb storage vs. intelligent contradiction handling.',
    icon: TroubleshootRoundedIcon,
    animationVariant: 'conflict',
    animationConcept: 'Two competing waveforms intersect and trigger a resolving pulse, representing contradiction detection and reconciliation.',
    accent: 'secondarySoft',
  },
  {
    title: 'Memory Architecture',
    eyebrow: 'The right tool for the right thought.',
    description:
      "Hyperstruck doesn't dump everything into a single bucket. We use specialized vector, graph, and relational memory structures for different cognitive tasks.",
    difference: 'Monolithic memory vs. specialized cognition.',
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
    subtext: '+ $0.0000383 / sec compute',
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
  'Persistent memory',
  'Domain-specialist adaptation',
  'Secure orchestration',
] as const;

export const metrics = [
  {
    value: '1 API',
    label: 'to plug Hyperstruck into existing workflows',
    icon: ApiRoundedIcon,
  },
  {
    value: '10k+',
    label: 'learnings available on the Pro tier',
    icon: InsightsRoundedIcon,
  },
  {
    value: '∞',
    label: 'applications supported across pricing plans',
    icon: AutoAwesomeRoundedIcon,
  },
] as const;
