// Root-level only. Applies to the WHOLE repo since commits span
// both frontend/ and backend/ changes together.
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed commit types
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'build', 'ci', 'revert'],
    ],
    // Forces you to declare WHICH part of the mono-folder the commit touches
    'scope-enum': [2, 'always', ['frontend', 'backend', 'shared', 'ci', 'deps']],
    'subject-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 72],
  },
};