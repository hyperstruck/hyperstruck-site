import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import type { SvgIconComponent } from '@mui/icons-material';

export interface Feature {
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  subtext?: string;
  icon: SvgIconComponent;
  featureList: string[];
  featured?: boolean;
}

export interface FeatureRow {
  capability: string;
  starter: string;
  pro: string;
  enterprise: string;
}

export const features: Feature[] = [
  {
    title: 'Reasoning engine',
    description:
      'A full cognitive runtime that plans multi-step work, executes with structured tool calls, reflects on output quality, and revises when needed. Not a prompt wrapper.',
  },
  {
    title: 'Compounding learning',
    description:
      'Without learning, every task starts from zero. The same failures repeat, useful patterns are lost, and you pay for mistakes your agent already made. Hyperstruck turns experience into compounding advantage. Your agents become more reliable, safer, and more effective, constantly.',
  },
  {
    title: 'Framework integrations',
    description:
      'Use Hyperstruck on its own, bring agents and tools from LangGraph, OpenAI Agents SDK, or CrewAI, or use the built-in skills for Claude Code and Cursor. Hyperstruck adds reasoning and learning underneath without replacing your stack.',
  },
  {
    title: 'Production ready',
    description:
      'Hosted APIs, generated Python and TypeScript SDKs, Claude Code and Cursor skills, and human-in-the-loop gates. Customer data is tenant-isolated with row-level security, encrypted credentials, and PII masking.',
  },
];

export const benchmarkStats = [
  { label: 'Known problem types', withLearnings: '85%', without: '20%' },
  { label: 'Silent failure avoidance', withLearnings: '84%', without: '9%' },
  { label: 'Overall task quality', withLearnings: '92%', without: '74%' },
  { label: 'Correct operation ordering', withLearnings: '83%', without: '17%' },
  { label: 'Strategy adoption', withLearnings: '83%', without: '13%' },
] as const;

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Start building with learnings immediately.',
    price: '$20 / month',
    subtext: 'Free credits included. No credit card required.',
    icon: AutoAwesomeRoundedIcon,
    featureList: [
      '1 agent',
      '1 GB knowledge storage',
      '100 learnings',
      'Unlimited application',
    ],
  },
  {
    name: 'Pro',
    description: 'Build domain-expert agents across your team.',
    price: '$299 / month',
    subtext: '+ compute usage',
    icon: BoltRoundedIcon,
    featureList: [
      'Up to 30 agents',
      'Up to 10 GB knowledge storage',
      '10,000 learnings + paid expansion',
      'Unlimited application',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'Organisation-wide intelligence with full controls.',
    price: 'Contact us',
    icon: BusinessCenterRoundedIcon,
    featureList: [
      'Custom agent limits',
      'Custom knowledge storage',
      'Custom learning limits',
      'Unlimited application',
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
    capability: 'Compliance and governance',
    starter: 'N/A',
    pro: 'Purchasable add-on',
    enterprise: 'PII masking, OTEL, prompt-injection prevention',
  },
  {
    capability: 'Learning depth',
    starter: 'Single-agent learnings',
    pro: 'Domain specialisation across agents',
    enterprise: 'Aggregated learning across agent classes',
  },
  {
    capability: 'Deduplication',
    starter: 'Automatic',
    pro: 'Automatic',
    enterprise: 'Automatic + tuneable thresholds',
  },
  {
    capability: 'Conflict resolution',
    starter: 'Not included',
    pro: 'Automatic',
    enterprise: 'Automatic + admin controls',
  },
  {
    capability: 'Domain expertise',
    starter: 'Single domain',
    pro: 'Multi-domain',
    enterprise: 'Organisation-wide + cross-domain',
  },
  {
    capability: 'Embedding options',
    starter: 'Platform default',
    pro: 'Larger models available',
    enterprise: 'Custom models',
  },
  {
    capability: 'Support',
    starter: 'Community and docs',
    pro: 'Email support',
    enterprise: 'Dedicated support + SLA',
  },
  {
    capability: 'Deployment',
    starter: 'Hosted',
    pro: 'Hosted',
    enterprise: 'Hosted or self-hosted',
  },
];
