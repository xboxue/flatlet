const withTypescript = require('@zeit/next-typescript');
const withTM = require('next-transpile-modules');

module.exports = withTypescript(
  withTM({
    transpileModules: ['recyclerlistview', 'lodash-es'],
    webpack: config => {
      config.resolve.alias = {
        'react-native$': 'react-native-web'
      };

      return config;
    }
  })
);
