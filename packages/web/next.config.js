const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  webpack: config => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web'
    };

    return config;
  }
});
