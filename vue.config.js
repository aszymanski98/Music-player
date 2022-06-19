const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/Music-player/' : '/',
  pwa: {
    name: 'Music App',
    themeColor: '#ff5e3a',
    manifestOptions: {
      short_name: 'Music',
    },
  },
});
