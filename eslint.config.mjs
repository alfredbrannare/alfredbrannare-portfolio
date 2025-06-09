import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript'
  ),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/self-closing-comp': [
        'warn',
        { component: true, html: true },
      ],
      'react-hooks/exhaustive-deps': 'warn',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'warn',
      'no-var': 'error',

      'object-shorthand': ['warn', 'always'],
      'prefer-template': 'warn',
      'quote-props': ['warn', 'as-needed'],

      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-implicit-coercion': 'warn',
      'no-unneeded-ternary': 'warn',
      'prefer-object-spread': 'warn',

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/prefer-nullish-coalescing':
        'warn',
      '@typescript-eslint/prefer-optional-chain': 'warn',
    },
  },
  eslintConfigPrettier,
];
