import { SpawnOptions, spawnSync } from 'child_process'
import consola from 'consola'

export function runCommand(cmd: string, opts: SpawnOptions) {
  const result = spawnSync(cmd, {
    shell: true,
    stdio: 'inherit',
    ...opts,
  })
  if (result.status !== 0) {
    consola.error(`Execute command error (${cmd})`)
    process.exit(1)
  }
  return result
}
