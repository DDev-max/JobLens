import { createDefaultEsmPreset } from 'ts-jest'

export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  clearMocks: true,

  extensionsToTreatAsEsm: ['.ts', '.mts'],

  transform: {
    '^.+\\.[tm]?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          allowImportingTsExtensions: true,
        },
      },
    ],
  },

  ...createDefaultEsmPreset(),

  moduleNameMapper: {
    '^#(.*)\\.js$': '<rootDir>/src/$1.ts',
    '^#(.*)$': '<rootDir>/src/$1.ts',
  },
}
