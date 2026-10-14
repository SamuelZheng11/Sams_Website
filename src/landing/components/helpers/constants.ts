// Static presentation content for the ID-Badge landing page. Everything that
// is user-curated content lives in the S3 / API bucket and is loaded at
// runtime through the information slice; this file only holds design-level
// copy that has no data source (marquee words, stack chips, the three stat
// tiles and the hero accent copy).

export const LOCATION_TIMEZONE = 'Australia/Sydney'

export const HERO_ROLE = 'AI & Full-Stack Engineer'

export const HERO_TAGLINE =
  'I ship agentic AI products end to end — the agents, MCP servers and full-stack systems behind them.'

export const HERO_BADGE_TAGS = ['Agentic AI', 'MCP', 'TS', 'React', 'AWS']
export const HERO_BADGE_SHIPPED_TAG = 'SHIPS TO PROD'

export const MARQUEE_ITEMS = [
  'Agentic AI',
  'MCP servers',
  'LLM integrations',
  'Tool calling',
  'Prompt engineering',
  'GenAI',
  'OpenAI',
  'TypeScript',
  'JavaScript',
  'React',
  'React Native',
  'Angular',
  'Node.js',
  'REST APIs',
  'System design',
  'Jest',
  'C#',
  '.NET',
  'SQL',
  'MongoDB',
  'Azure',
  'AWS',
  'Docker',
  'Terraform',
  'CI/CD',
]

export const STACK_CHIPS = [
  'Agentic AI',
  'MCP servers',
  'LLM integrations',
  'Tool calling',
  'GenAI',
  'TypeScript',
  'React',
  'React Native',
  'Angular',
  'Node.js',
  'C#',
  '.NET',
  'AWS',
]

// The three animated stat tiles. `value` is the number that counts up,
// `prefix` / `suffix` frame it and `label` sits under it.
export const STAT_TILES = [
  { value: 1, prefix: '', suffix: 'k+', label: 'stakeholders served monthly by AI & analytics features' },
  { value: 2, prefix: '', suffix: 'k+', label: 'delivery vehicles tracked live' },
  { value: 30, prefix: '', suffix: 'k+', label: 'online orders processed daily' },
]

// The bento bio shows the first About paragraph as the lead statement; any
// blank-line separated paragraphs after it render as a full-width muted note
// below the availability tile.
export const OPEN_TO_WORK_ROLES = 'Senior AI & software engineering roles'

export const CONTACT_INTRO =
  'Open to senior software and AI engineering roles — including agentic AI and MCP work. I reply within a few days.'

// The projects section (rendered in the reference's `#writing` rows). The
// content itself is fetched from the S3 projects blob; only the section chrome
// is static.
export const PROJECTS_SECTION_EYEBROW = '04 / Projects'

export const PROJECTS_SECTION_INTRO =
  'Personal projects and prototypes. Each entry connects directly to the repository alongside a breakdown of the core problem it solves.'