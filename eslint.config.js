const nx = require('@nx/eslint-plugin');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    extends: [
      'eslint:recommended',
      "prettier"
    ],
    rules: {
      'semi': ['error', 'always'], // Enforce semicolons at the end of statements
      'quotes': ['error', 'single'], // Enforce single quotes for strings
      'indent': ['error', 2], // Enforce 2-space indentation
      'no-unused-vars': ['warn'], // Warn about unused variables
      'eqeqeq': ['error', 'always'], // Enforce strict equality (===)
      'no-console': ['warn'], // Warn about console.log usage
      'no-debugger': ['warn'], // Warn about debugger statements
      'brace-style': ['error', '1tbs'], // Enforce one true brace style
      'max-len': ['error', { code: 120 }], // Enforce a maximum line length
      'camelcase': ['error', { properties: 'always' }], // Enforce camelCase naming convention
      'prefer-const': ['error'], // Prefer `const` over `let` when variables are not reassigned
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-input-rename': ['error'], // Enforce no input renaming
      '@angular-eslint/no-output-rename': ['error'], // Enforce no output renaming
      '@angular-eslint/no-output-native': ['error'], // Prevent usage of native DOM events as output
      '@typescript-eslint/no-explicit-any': ['warn'], // Warn on the usage of `any`
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
