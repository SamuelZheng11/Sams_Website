// Static presentation content for the ID-Badge landing page. Everything that
// is user-curated content lives in the S3 / API bucket and is loaded at
// runtime through the information slice; this file only holds design-level
// copy that has no data source (marquee words, stack chips, the three stat
// tiles and the hero accent copy).

export const LOCATION_TIMEZONE = 'Australia/Sydney'

export const HERO_ROLE = 'Software Engineer'

export const HERO_TAGLINE =
  'I build and ship reliable software, end to end — across analytics, logistics and industrial tech.'

export const HERO_BADGE_TAGS = ['React', 'TS', "MCP", 'C#', 'AWS']
export const HERO_BADGE_SHIPPED_TAG = 'SHIPS TO PROD'

export const MARQUEE_ITEMS = [
  'TypeScript',
  'JavaScript',
  'React',
  'React Native',
  'Angular',
  'Node.js',
  'MCP servers',
  'AI / LLMs',
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
  'TypeScript',
  'React',
  'React Native',
  'Angular',
  'Node.js',
  'MCP servers',
  'AI / LLMs',
  'C#',
  '.NET',
  'AWS',
]

// The three animated stat tiles. `value` is the number that counts up,
// `prefix` / `suffix` frame it and `label` sits under it.
export const STAT_TILES = [
  { value: 1, prefix: '', suffix: 'k+', label: 'stakeholders served monthly by analytic'},
  { value: 2, prefix: '', suffix: 'k+', label: 'delivery vehicles tracked live' },
  { value: 30, prefix: '', suffix: 'k+', label: 'online orders processed daily' },
]

// The bento bio shows the first About paragraph as the lead statement; any
// blank-line separated paragraphs after it render as a full-width muted note
// below the availability tile.
export const OPEN_TO_WORK_ROLES = 'Senior engineer roles'

export const CONTACT_INTRO = 'Open to senior software engineering roles. I reply within a few days.'

// The projects section (rendered in the reference's `#writing` rows). The
// content itself is fetched from the S3 projects blob; only the section chrome
// is static.
export const PROJECTS_SECTION_EYEBROW = '04 / Projects'

export const PROJECTS_SECTION_INTRO =
  'Personal projects and prototypes. Each entry connects directly to the repository alongside a breakdown of the core problem it solves.'