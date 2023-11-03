module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        alias: {
          '@App': './App',
          '@Data': './App/Data',
          '@Storage': './App/Data/Storage',
          '@Domain': './App/Domain',
          '@Network': './App/Network',
          '@Helper': './App/Helper',
          '@Presentation': './App/Presentation',
          '@Components': './App/presentation/components',
        },
      },
    ],
  ],
};
