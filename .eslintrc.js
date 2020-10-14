module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-tabs': 0,
    'no-console': 0,
    'indent': ["error", 2],
    'no-useless-escape': 0,
    '@typescript-eslint/no-empty-function': 0,
    'semi': [0, "always"],
    'no-trailing-spaces': 0,
    'object-curly-newline': 0,
    'padded-blocks': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/class-name-casing': 0,
    '@typescript-eslint/no-use-before-define': 0
  }
}
