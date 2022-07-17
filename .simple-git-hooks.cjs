module.exports = {
  'commit-msg': 'pnpm -s dlx commitlint --edit "$1"',
  'pre-commit': 'pnpm -s dlx lint-staged',
  'prepare-commit-msg': 'exec < /dev/tty && git cz --hook || true'
}
