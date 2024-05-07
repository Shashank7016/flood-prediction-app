const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' }, // Customize your theme here
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
module.exports = {
  style: {
    modules: {
      localIdentName: "[local]__[hash:base64:5]",
    }
  }
};
