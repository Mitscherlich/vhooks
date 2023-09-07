import 'zx/globals'
import getGitRepoInfo from 'git-repo-info'
import { PATHS, SCRIPTS } from './.internal/constants'

(async () => {
  const root = PATHS.ROOT
  const pkgDir = path.join(root, './packages')
  const pkgs = await fs.readdir(pkgDir)

  const { author } = getGitRepoInfo()

  for (const pkg of pkgs) {
    if (pkg.charAt(0) === '.')
      continue
    if (!(await fs.stat(path.join(pkgDir, pkg))).isDirectory())
      continue

    await bootstrapPkg({
      pkgDir,
      pkg,
      force: !!argv.force,
    })
  }

  function getName(pkgName: string) {
    if (['vhooks'].includes(pkgName))
      return pkgName
    else
      return /^\@m9ch\/vhooks-/.test(pkgName) ? pkgName : `@m9ch/vhooks-${pkgName}`
  }

  function getVersion() {
    return require(PATHS.PACKAGE_JSON).version
  }

  async function bootstrapPkg(opts: any) {
    const pkgDir = path.join(opts.pkgDir, opts.pkg)
    if (!opts.force && fs.existsSync(path.join(pkgDir, 'package.json'))) {
      console.log(`${opts.pkg} exists`)
    }
    else {
      const name = getName(opts.pkg)

      // package.json
      const pkgPkgJSONPath = path.join(pkgDir, 'package.json')
      const hasPkgJSON = fs.existsSync(pkgPkgJSONPath)
      const pkgPkgJSON = hasPkgJSON ? require(pkgPkgJSONPath) : {}
      await fs.writeJSON(
        pkgPkgJSONPath,
        Object.assign(
          {
            name,
            version: getVersion(),
            description: name,
            license: 'MIT',
            author,
            homepage: `https://github.com/Mitscherlich/vhooks/tree/dev/packages/${opts.pkg}#readme`,
            repository: {
              type: 'git',
              url: 'git+https://github.com/Mitscherlich/vhooks.git',
              directory: `packages/${opts.pkg}`,
            },
            bugs: 'https://github.com/Mitscherlich/vhooks/issues',
            main: 'dist/index.cjs',
            module: 'dist/index.mjs',
            types: 'dist/index.d.ts',
            files: ['dist'],
            scripts: {
              build: SCRIPTS.BUILD,
              dev: SCRIPTS.DEV,
              test: SCRIPTS.TEST,
            },
          },
          {
            ...(hasPkgJSON
              ? {
                  files: pkgPkgJSON.files,
                  scripts: pkgPkgJSON.scripts,
                  descriptions: pkgPkgJSON.descriptions,
                  dependencies: pkgPkgJSON.dependencies,
                  devDependencies: pkgPkgJSON.devDependencies,
                }
              : {}
            ),
          },
        ),
        { spaces: '  ' },
      )

      // README.md
      await fs.writeFile(path.join(pkgDir, 'README.md'), `# ${name}\n`, 'utf-8')

      // tsconfig.json
      await fs.writeJSON(
        path.join(pkgDir, 'tsconfig.json'),
        {
          extends: path.relative(pkgDir, PATHS.TS_CONFIG_BASE),
          compilerOptions: {
            outDir: './dist',
          },
          include: ['src'],
        },
        { spaces: '  ' },
      )

      // build.config.ts
      await fs.writeFile(
        path.join(pkgDir, 'build.config.ts'),
        `
export default {
  entries: ['src/index'],
  clean: true,
  declaration: true,
  sourcemap: true,
  rollup: { emitCJS: true },
}\n`.trimLeft(),
        'utf-8',
      )

      // src/index.ts
      const srcDir = path.join(pkgDir, 'src')
      if (!fs.existsSync(srcDir))
        await $`mkdir ${srcDir}`

      if (!fs.existsSync(path.join(srcDir, 'index.ts'))) {
        await fs.writeFile(
          path.join(srcDir, 'index.ts'),
          `
export default () => {
  return '${name}'
}\n`.trimLeft(),
          'utf-8',
        )
      }

      console.log(chalk.green(`${opts.pkg} bootstrapped`))
    }
  }
})()
