import { PATHS } from './.internal/constants'
import { runCommand } from './.internal/utils'

(async () => {
  const args = process.argv.slice(2)

  // no cache
  if (args.includes('--no-cache'))
    args.unshift('--force')

  // filter
  if (!args.includes('--filter')) {
    // Tips: should use double quotes, single quotes are not valid on windows.
    args.unshift('--filter', '"./packages/*"')
  }

  // turbo cache
  if (!args.includes('--cache-dir'))
    args.unshift('--cache-dir', '".turbo"')

  const command = `turbo run ${args.join(' ')}`

  runCommand(command, { cwd: PATHS.ROOT })
})()
