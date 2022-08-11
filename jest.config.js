module.exports = {
  collectCoverage: true,
  silent: false,
  verbose: true,
  resetMocks: true,
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
};