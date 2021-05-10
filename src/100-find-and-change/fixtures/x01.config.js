const path = require('path');
const SomePlugin = require('some-plugin');

module.exports = {
  root: path.join(__dirname, 'tmp'),
  name: 'x01.config.js',
  plugins: [
    new SomePlugin({
      definedInstanceDir: './src/plugins/app',
      options: {
        activeInstance: 'dev.js',
        doNotChangeMe: true,
      },
    }),

    new SomePlugin({
      definedInstanceDir: './src/plugins/app',
      options: {
        doNotChangeMe: true,
      },
    }),

    new SomePlugin({
      definedInstanceDir: './src/plugins/app',
      options: {},
    }),

    new SomePlugin({
      definedInstanceDir: './src/plugins/app',
    }),

    new SomePlugin(),
  ],
};
