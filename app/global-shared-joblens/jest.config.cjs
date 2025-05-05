// jest.config.cjs
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
}
