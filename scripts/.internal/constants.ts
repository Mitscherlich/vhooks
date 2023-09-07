import { join } from 'path'

const ROOT = join(__dirname, '../..')

export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  EXAMPLES: join(ROOT, './examples'),
  PACKAGE_JSON: join(ROOT, './package.json'),
  TS_CONFIG_BASE: join(ROOT, './tsconfig.json'),
} as const

export const SCRIPTS = {
  DEV: 'unbuild --stub',
  TEST: 'vitest run',
  BUILD: 'unbuild',
} as const
