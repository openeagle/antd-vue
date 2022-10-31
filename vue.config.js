const AutoDllPlugin = require('autodll-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'development') {
      config.plugin('AutoDll').use(AutoDllPlugin, [
        {
          debug: true,
          filename: '[name].dll.js',
          entry: {
            vendor: [
              '@ant-design/icons-vue',
              '@tinymce/tinymce-vue',
              '@openeagle/eaxios',
              'accounting',
              'ant-design-vue/es/index.js',
              'core-js',
              'lodash-es',
              'mockjs',
              'dayjs',
              'vue',
              './config/dll/babel-runtime.js',
            ],
          },
          inject: true,
        },
      ]);
      config.plugin('hard-source').use(HardSourceWebpackPlugin, [
        {
          cachePrune: {
            // 七天内有效
            maxAge: 7 * 24 * 60 * 60 * 1000,
            // 不超过 1G
            sizeThreshold: 1 * 1024 * 1024 * 1024,
          },
        },
      ]);
      // hard-source-exclude 和 mini-css-extract-plugin 存在兼容问题
      config
        .plugin('hard-source-exclude')
        .use(HardSourceWebpackPlugin.ExcludeModulePlugin, [
          [
            {
              test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
            },
          ],
        ]);
    }
    if (process.env.ANALYZER === 'true') {
      config
        .plugin('bundle-analyzer')
        .use(BundleAnalyzerPlugin.BundleAnalyzerPlugin, [
          {
            analyzerMode: 'static',
          },
        ]);
    }
  },
  configureWebpack:
    process.env.NODE_ENV === 'development'
      ? {
          devtool: 'eval',
        }
      : {
          devtool: false,
          output: {
            library: 'openeagle_antd',
            libraryTarget: 'umd',
          },
        },
};
