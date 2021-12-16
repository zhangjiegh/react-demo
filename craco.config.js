const CracoLessPlugin = require("craco-less");
module.exports = {
  babel: {
    plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器语法
    ],
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://demo", // 代理路径
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              // '@primary-color': '#1DA57A'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
