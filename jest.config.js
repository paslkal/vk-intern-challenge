/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};