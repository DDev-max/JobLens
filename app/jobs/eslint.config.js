import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import jestPlugin from 'eslint-plugin-jest'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['**/dist/**']),

  {
    ignores: ['**/dist/**'],
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js, jest: jestPlugin, prettier },
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,

      'prettier/prettier': 'error',
      'no-console': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      'jest/no-mocks-import': 'off',
    },
    extends: ['js/recommended', eslintConfigPrettier],
  },
  { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
])
