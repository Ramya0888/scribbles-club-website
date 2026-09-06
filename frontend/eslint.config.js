import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';
export default [
  js.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node }, ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } } },
  { files: ['**/*.{js,jsx}'], plugins: { react }, rules: { 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], 'react/prop-types': 'off', 'no-undef': 'off' }, settings: { react: { version: 'detect' } } },
  { ignores: ['dist/', 'node_modules/'] },
];
