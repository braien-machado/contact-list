module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:mocha/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    'sonarjs',
    'mocha'
  ],
  rules: {
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    camelcase: 'warn',
    'arrow-parens': [
      2,
      'always'
    ],
    quotes: [
      2,
      'single'
    ],
    'implicit-arrow-linebreak': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    'no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': '^_',
        ignoreRestSiblings: true
      }
    ],
    'object-curly-newline': 'off',
    'max-params': [
      'error',
      4
    ],
    'max-lines': [
      'error',
      250
    ],
    'max-lines-per-function': [
      'error',
      {
        max: 20,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    'max-len': [
      'error',
      100,
      {
        ignoreComments: true
      }
    ],
    complexity: [
      'error',
      12
    ],
    'import/no-extraneous-dependencies': [
      'off'
    ],
    'sonarjs/cognitive-complexity': [
      'error',
      12
    ],
    'sonarjs/no-one-iteration-loop': [
      'error'
    ],
    'sonarjs/no-identical-expressions': [
      'error'
    ],
    'sonarjs/no-use-of-empty-return-value': [
      'error'
    ],
    'sonarjs/no-extra-arguments': [
      'error'
    ],
    'sonarjs/no-identical-conditions': [
      'error'
    ],
    'sonarjs/no-collapsible-if': [
      'error'
    ],
    'sonarjs/no-collection-size-mischeck': [
      'error'
    ],
    'sonarjs/no-duplicate-string': [
      'error'
    ],
    'sonarjs/no-duplicated-branches': [
      'error'
    ],
    'sonarjs/no-identical-functions': [
      'error'
    ],
    'sonarjs/no-redundant-boolean': [
      'error'
    ],
    'sonarjs/no-unused-collection': [
      'error'
    ],
    'sonarjs/no-useless-catch': [
      'error'
    ],
    'sonarjs/prefer-object-literal': [
      'error'
    ],
    'sonarjs/prefer-single-boolean-return': [
      'error'
    ],
    'sonarjs/no-inverted-boolean-check': [
      'error'
    ]
  }
}