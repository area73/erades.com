import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import tsParser from '@typescript-eslint/parser';

/** @type {import('eslint').FlatConfig[]} */
export default [
  // Astro files
  {
    files: ['src/**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: { astro },
    rules: {
      ...astro.configs.recommended.rules,
    },
  },
  // TypeScript files
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {},
  },
];
