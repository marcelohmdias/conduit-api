import { join } from 'node:path'

import { addAlias } from 'module-alias'

addAlias('@src', join(__dirname, '..'))
addAlias('@config', join(__dirname, '..', 'config'))
addAlias('@core', join(__dirname, '..', 'core'))
addAlias('@ports', join(__dirname, '..', 'ports'))
addAlias('@adapters', join(__dirname, '..', 'adapters'))
