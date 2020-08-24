module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'prettier',
  ],
  globals: {
    fetch: false,
    Headers: false
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true
    }
  },
  rules: {
    'no-shadow': 'off',
    'react/no-did-update-set-state': 'off',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    // 'jsx-closing-bracket-location': [1, 'line-aligned'],
    curly: ['error', 'multi-line'],
    "comma-dangle": ["error", "only-multiline"],
    'max-len': ['error', {'code': 120, 'ignoreUrls': true}],
  },
};
