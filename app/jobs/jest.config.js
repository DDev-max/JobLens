/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  clearMocks: true,

  extensionsToTreatAsEsm: ['.ts', '.mts'],

  transform: {
    '^.+\\.[tm]?[tj]sx?$': ['ts-jest', { useESM: true }],
  },
}
