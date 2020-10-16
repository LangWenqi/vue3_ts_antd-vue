
module.exports = {
  lintOnSave: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '产品中心'
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  css: {
    loaderOptions: {
      // modules: true,
      // 给 sass-loader 传递选项
      scss: {
        // sass-loader v7 中，这个选项名是 "data"
        // data: `@import "@/styles/variables.scss";`
        // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
        // 因为 `scss` 语法在内部也是由 sass-loader 处理的
        // 但是在配置 `data` 选项的时候
        // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
        // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
        prependData: `
        @import "@/styles/mixin.scss";
        @import "@/styles/variables.scss";
        `
      },
      less: {
        lessOptions: {
          modifyVars: {
          },
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    // open: process.platform === 'darwin',
    port: 1024,
    // 开启后默认热更新无法热更新的部分直接刷新页面，关闭所有部分刷新页面
    hot: false,
    // 开启后无法热更新的部分报无法热更新错误
    hotOnly: false,
    // 设置为false的时候关闭自动刷新页面
    liveReload: false,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_REQUEST_URL,
        changeOrigin: true,
        onProxyReq (proxyReq, req, res) {
          proxyReq.setHeader('cookie', `${process.env.VUE_APP_COOKIE_KEY}=e4g663hpo1b2hhbth1bo990cj8`);
        }
        // pathRewrite:{
        //   '^/api':''
        // }
      }
    }
  },
  configureWebpack: config => {
    const splitChunks = {
      automaticNameDelimiter: '-'
    };
    config.optimization = {
      splitChunks
    };
    if (process.env.NODE_ENV === 'production') {
      // config
      // .optimization = {
      //   splitChunks,
      // 	minimizer: [
      // 		new TerserPlugin({
      // 			terserOptions: {
      // 				compress: {
      // 					drop_console: true,
      // 					drop_debugger: true
      // 				},
      // 				output: {
      // 					comments: false
      // 				}
      // 			}
      // 		})
      // 	]
      // };
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      config.output.devtoolModuleFilenameTemplate = info => {
        const resPath = info.resourcePath
        if ((/\.vue$/.test(resPath) && !/type=script/.test(info.identifier)) || /node_modules/.test(resPath)) {
          return `webpack:///${resPath}?${info.hash}`
        }
        return `webpack:///${resPath.replace('./src', 'my-code/src')}`
      }
      config.devtool = 'source-map';
    }
  },
  productionSourceMap: false
};
