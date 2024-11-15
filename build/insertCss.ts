import fs from 'fs'
import { resolve } from 'path'

let viteConfig: any

const libCss = () => ({
  name: 'lib-css',

  configResolved(resolvedConfig) {
    viteConfig = resolvedConfig
  },

  // 生成bundle时调用
  writeBundle(option, bundle) {
    if (!viteConfig.build || !viteConfig.build.lib) {
      // only for lib build
      console.warn('只支持库模式')
      return
    }
    if (option.format !== 'es') {
      // only for es built
      return
    }
    const files = Object.keys(bundle)
    const cssFile = files.find(v => v.endsWith('.css'))
    if (!cssFile) {
      return
    }
    for (const file of files) {
      if (!bundle[file].isEntry) {
        // only for entry
        continue
      }
      const outDir = viteConfig.build.outDir || 'dist'
      const filePath = resolve(viteConfig.root, outDir, file)
      const data = fs.readFileSync(filePath, {
        encoding: 'utf8'
      })
      fs.writeFileSync(filePath, `import './${cssFile}';\n${data}`)
    }
  }
})

export default libCss
