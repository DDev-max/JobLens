/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,

  collectCoverage: false,

  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/build/**',
    '!vite.config.ts',
    '!**/coverage/**',
  ],

  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['/node_modules/', 'setup-tests.ts', 'vite-env.d.ts'],

  coverageProvider: 'v8',

  moduleNameMapper: {
    '^#globalShared/(.*)$': '<rootDir>/../global-shared/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^#(.*)$': '<rootDir>/src/$1',
    
  },

  setupFilesAfterEnv: ['<rootDir>/setup-test.ts'],

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}

export default config
