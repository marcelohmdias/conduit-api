const { defineConfig } = require('eslint-define-config')

const isDev = process.env.NODE_ENV === 'development'

module.exports = defineConfig({
  env: {
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
  rules: {
    'no-console': isDev ? 'off' : 'error',
    'no-debugger': isDev ? 'off' : 'error',
    'sort-imports': ['warn', { ignoreDeclarationSort: true, ignoreCase: true }],
    'prettier/prettier': [
      'error',
      {
        printWidth: 120
      },
      {
        usePrettierrc: true
      }
    ],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^node:/',
          'module',
          '/^@src/',
          '/^@config/',
          '/^@core/',
          '/^@ports/',
          '/^@adapters/',
          ['parent', 'sibling', 'index']
        ],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ]
  }
})
