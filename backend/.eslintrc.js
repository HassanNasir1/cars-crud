module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true
  },
  parser: '@babel/eslint-parser',
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    project: './jsconfig.json',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'import/no-anonymous-default-export': 'off',

    // add new line above comment
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        beforeBlockComment: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        allowArrayStart: true
      }
    ],

    // add new line above return
    'newline-before-return': 'error',

    // add new line below import
    'import/newline-after-import': [
      'error',
      {
        count: 1
      }
    ],

    // add new line after each var, const, let declaration
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['export'], next: ['*'] },
      { blankLine: 'always', prev: ['*'], next: ['multiline-const', 'multiline-let', 'multiline-var', 'export'] }
    ]
  }
}
