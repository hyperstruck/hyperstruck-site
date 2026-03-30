import ApiRoundedIcon from '@mui/icons-material/ApiRounded';
import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AllInclusiveRoundedIcon from '@mui/icons-material/AllInclusiveRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
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
      'Long-term contextual awareness that compounds with every interaction and makes agents sharper over time.',
    icon: MemoryRoundedIcon,
    accent: 'primary',
  },
  {
    title: 'Real Learning',
    description:
      'Dynamic adaptation to your business logic, preferred workflows, and communication style without rebuilding tools.',
    icon: PsychologyAltRoundedIcon,
    accent: 'secondary',
  },
  {
    title: 'Domain Expertise',
    description:
      'Out-of-the-box specialization for fintech, legal, and deep-tech operating environments where quality matters.',
    icon: ArchitectureRoundedIcon,
    accent: 'tertiary',
    featured: true,
  },
  {
    title: 'Trust and Control',
    description:
      'Enterprise-grade governance with traceable decisions, visibility into behavior, and tighter operational guardrails.',
    icon: SecurityRoundedIcon,
    accent: 'primary',
  },
  {
    title: 'Quality Output',
    description:
      'Higher-fidelity results that keep brand voice, technical precision, and institutional knowledge intact.',
    icon: BoltRoundedIcon,
    accent: 'secondary',
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
