module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@server$': '<rootDir>/src/server.ts',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@dataaccess/(.*)$': '<rootDir>/src/dataaccess/$1',
    '^@business/(.*)$': '<rootDir>/src/business/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: true,
    },
  },
};
