module.exports = {
  reporters: ['default', ['jest-junit', { suiteName: 'jest tests' }]],
  testMatch: [
    '<rootDir>/__tests__/**/?(*.)(spec|test).{js,jsx}',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/setupEnzyme.js'],
  collectCoverage: true,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__tests__/style.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$':
      '<rootDir>/__tests__/fileMock.js',
  },
};
