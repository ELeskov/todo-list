import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import simpleSortImportPlugin from 'eslint-plugin-simple-import-sort'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleSortImportPlugin
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' }
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next', '^[a-z]'],
            ['^@/shared', '^@/features', '^@/entities', '^@/widgets'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$']
          ]
        }
      ],
      'simple-import-sort/exports': 'error',

      'no-console': 'warn',
      'eqeqeq': 'warn',
      'curly': 'warn',
      'no-else-return': 'warn',
      'default-case': 'warn',

      'import/order': 'off',
      'import/no-unresolved': 'off',
      
      'no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        },
      ],
    },
  },
])
