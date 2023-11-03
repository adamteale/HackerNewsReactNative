module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-keychain|@react-navigation|@react-native-webview|react-native-webview|@react-native-gesture-handler|react-native-gesture-handler)/.*)',
  ],
  setupFiles: [
    './jestSetupFile.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/App/$1',
    '^@Data/(.*)$': '<rootDir>/App/Data/$1',
    '^@Storage/(.*)$': '<rootDir>/App/Data/Storage/$1',
    '^@Domain/(.*)$': '<rootDir>/App/Domain/$1',
    '^@Network/(.*)$': '<rootDir>/App/Network/$1',
    '^@Helper/(.*)$': '<rootDir>/App/Helper/$1',
    '^@Presentation/(.*)$': '<rootDir>/App/Presentation/$1',
    '^@Components/(.*)$': '<rootDir>/App/presentation/components/$1',
  },
};
