import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import testingLibrary from 'eslint-plugin-testing-library'
import jestPlugin from 'eslint-plugin-jest'

export default [
  ...tseslint.config(
    { ignores: ['dist', 'vite.config.ts', 'coverage', ' src/shared/__mocks__/fileMock.js'] },
    {
      extends: [
        js.configs.recommended,
        ...tseslint.configs.recommended,
        eslintConfigPrettier,
        jsxA11y.flatConfigs.recommended,
        testingLibrary.configs['flat/react'],
      ],
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: {
          ...globals.browser,
        },
        parserOptions: {
          project: './tsconfig.json',
        },
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        prettier,
        jest: jestPlugin,
      },
      rules: {
        ...jestPlugin.configs['flat/recommended'].rules,
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'jsx-a11y/alt-text': 'error',
        'prettier/prettier': 'error',
        'no-console': 'warn',
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        'jest/no-mocks-import': 'off',
      },
    }
  ),
]
