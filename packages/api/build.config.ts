import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  entries: [
    {
      builder: 'mkdist',
      input: 'src',
      format: 'esm',
      ext: 'js'
    }
  ]
})
