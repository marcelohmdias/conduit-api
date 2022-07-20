module.exports = {
  'commit-msg': 'pnpm exec commitlint --edit "$1"',
  'pre-commit': 'pnpm exec lint-staged',
  'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true'
}
