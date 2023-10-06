const webpack = require('webpack');

function getClientEnvironment() {
  // Grab VITE_* environment variables and prepare them to be injected
  // into the application via DefinePlugin in webpack configuration.
  const VITE_PREFIX = /^VITE_/i;

  const raw = Object.keys(process.env)
    .filter((key) => VITE_PREFIX.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

module.exports = (config) => {
  // Overwrite the mode set by Angular if the NODE_ENV is set
  config.mode = process.env.NODE_ENV || config.mode;
  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment()));
  return config;
};
