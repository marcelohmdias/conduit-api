const fs = require('node:fs')
const path = require('node:path')
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'))

/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    scopes: [...packages]
  }
}
