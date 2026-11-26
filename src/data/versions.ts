export interface PrototypeVersion {
  id: 'original' | 'v1' | 'v2';
  index: string;
  title: string;
  methodology: string;
  url: string;
  shortHost: string;
  summary: string;
  highlights: string[];
}

export const PROTOTYPE_VERSIONS: PrototypeVersion[] = [
  {
    id: 'original',
    index: '00',
    title: 'Original Replica',
    methodology: 'Baseline Control',
    url: 'https://amazonoriginal-zeta.vercel.app/',
    shortHost: 'amazonoriginal-zeta.vercel.app',
    summary:
      'Control replica preserving traditional storefront navigation density, high-link headers, and standard account entry points.',
    highlights: [
      'Dense multi-row utility and category header',
      'Standard account & lists dropdown pattern',
      'High-density promotional product grid',
    ],
  },
  {
    id: 'v1',
    index: '01',
    title: 'Version 1',
    methodology: 'Intuition Accounts',
    url: 'https://amazon-enhanced.vercel.app/',
    shortHost: 'amazon-enhanced.vercel.app',
    summary:
      'First iteration restructured around intuitive account mental models, clearer personal entry points, and reduced task friction.',
    highlights: [
      'Intuition-driven account & profile hierarchy',
      'Simplified navigation paths for common shopping tasks',
      'Cleaner separation between discovery and account controls',
    ],
  },
  {
    id: 'v2',
    index: '02',
    title: 'Version 2',
    methodology: "Nielsen's 10 Heuristics",
    url: 'https://amazon-enhancedv2.vercel.app/',
    shortHost: 'amazon-enhancedv2.vercel.app',
    summary:
      "Second iteration refined systematically against Jakob Nielsen's 10 Usability Heuristics for clarity, feedback, and error prevention.",
    highlights: [
      'Explicit system status visibility and micro-feedback',
      'Recognition over recall with consistent visual standards',
      'Aesthetic minimalism paired with error-preventive controls',
    ],
  },
];

export interface ComparisonDimension {
  dimension: string;
  original: string;
  v1: string;
  v2: string;
}

export const COMPARISON_DIMENSIONS: ComparisonDimension[] = [
  {
    dimension: 'Navigation & IA',
    original: 'Multi-tier header with competing links and dense category menus.',
    v1: 'Streamlined primary pathways organized by intuitive user intent.',
    v2: 'Consistent hierarchy minimizing visual noise and cognitive load.',
  },
  {
    dimension: 'Account Experience',
    original: 'Nested hover menus separating orders, lists, and settings.',
    v1: 'Unified intuition-account model surfacing core user actions directly.',
    v2: 'Predictable account controls with clear state feedback and undo paths.',
  },
  {
    dimension: 'Visibility & Feedback',
    original: 'Minimal inline state confirmation during search and cart interactions.',
    v1: 'Clearer transitional states across primary account and cart actions.',
    v2: 'Immediate system status indicators across filters, cart, and forms.',
  },
  {
    dimension: 'Error Prevention & Recovery',
    original: 'Relies on post-action validation and deep back-navigation.',
    v1: 'Guided task flows that reduce accidental misclicks in checkout.',
    v2: 'Proactive constraints, confirmation cues, and clear recovery exits.',
  },
];

export interface HeuristicItem {
  number: string;
  name: string;
  application: string;
}

export const NIELSEN_HEURISTICS: HeuristicItem[] = [
  {
    number: '01',
    name: 'Visibility of system status',
    application: 'Clear active states, cart feedback, and loading cues keep shoppers informed in real time.',
  },
  {
    number: '02',
    name: 'Match between system and the real world',
    application: 'Natural shopping terminology and familiar retail grouping replace internal jargon.',
  },
  {
    number: '03',
    name: 'User control and freedom',
    application: 'Straightforward backtracks, quantity adjustments, and clear exit paths from modals or drawers.',
  },
  {
    number: '04',
    name: 'Consistency and standards',
    application: 'Unified button hierarchy, spacing rhythm, and predictable interactive patterns throughout.',
  },
  {
    number: '05',
    name: 'Error prevention',
    application: 'Guardrails around destructive cart actions and input validation before submission.',
  },
  {
    number: '06',
    name: 'Recognition rather than recall',
    application: 'Visible category signifiers, persistent search context, and clear product metadata.',
  },
  {
    number: '07',
    name: 'Flexibility and efficiency of use',
    application: 'Fast scan paths for repeat buyers alongside approachable browsing for first-time visitors.',
  },
  {
    number: '08',
    name: 'Aesthetic and minimalist design',
    application: 'Uncluttered product cards and disciplined whitespace keep attention on core buying decisions.',
  },
  {
    number: '09',
    name: 'Help users recognize, diagnose, and recover from errors',
    application: 'Plain-language inline guidance with actionable next steps whenever an issue occurs.',
  },
  {
    number: '10',
    name: 'Help and documentation',
    application: 'Contextual shipping, return, and account support cues surfaced at moments of decision.',
  },
];
