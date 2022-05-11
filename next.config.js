/* eslint-disable */
const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");

const pluginAntdLess = withAntdLess({
  modifyVars: {
    // "@THEME--DARK": "theme-dark",
    "@primary-color": "#1e80ff",
    // "@link-color": "inherit",
    // "@link-hover-color": "red",
    // "@link-active-color": "red",
  },
  // lessVarsFilePath: "./assets/styles/antd-custom.less",
  // cssLoaderOptions: {
  // esModule: false,
  // sourceMap: false,
  // modules: {
  // mode: 'local',
  // localIdentName: '[hash:2]',
  // },
  // },
});

module.exports = withPlugins([[pluginAntdLess]], {
  reactStrictMode: false,
  webpack(config) {
    return config;
  },
  images: {
    domains: ["*"],
  },
  async rewrites() {
    return [
      {
        // source: "/app/",
        // destination: "http://127.0.0.1:8080/app",
        source: "/api/:path*",
        // destination: "http://127.0.0.1:9898/:path*",
        // destination: "http://1.15.57.174:9898/:path*",
        destination: `${process.env.BASE_API}/:path*`,

        basePath: false,
      },
      {
        source: "/stc/:path*",
        // destination: "http://127.0.0.1:9898/stc/:path*",
        // destination: "http://1.15.57.174:9898/:path*",
        destination: `${process.env.BASE_API}/stc/:path*`,
        basePath: false,
      },
    ];
  },
  // images: {
  //   disableStaticImages: true,
  // },
  // NextFuture
  // future: {
  //   webpack5: true,
  // },
});
