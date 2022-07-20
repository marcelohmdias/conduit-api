import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { addAlias } from 'module-alias'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

addAlias('@src', join(__dirname, '..'))
addAlias('@config', join(__dirname, '..', 'config'))
addAlias('@core', join(__dirname, '..', 'core'))
addAlias('@ports', join(__dirname, '..', 'ports'))
addAlias('@adapters', join(__dirname, '..', 'adapters'))
