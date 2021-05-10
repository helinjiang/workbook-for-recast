const path = require('path');
const SomePlugin = require('some-plugin');

module.exports = {
  root: path.join(__dirname, 'tmp'),
  name: 'x01.config.js',
  plugins: [
    new SomePlugin({
      definedInstanceDir: './src/plugins/app',
      options: {},
    }),
  ],
};
