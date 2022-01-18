const path = require('path');
const postcssEnv = require('postcss-preset-env');
const config = {
  projectName: "taro-react-demo",
  date: "2021-12-28",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  alias: {
    '@/src': path.resolve(__dirname, '..', 'src/')
  },
  sass: {
    resource: ['src/assets/style/global.css'],
    projectDirectory: path.resolve(__dirname, '..'),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    webpackChain(chain) {
      // console.log('chain', chain.module.rules.store.get('nomorlCss').oneOfs.store.get('0').uses.store.get('2').uses)
      // console.log('chain', chain.toConfig().module.rules[4].oneOf[0].use[2].options.postcssOptions)
      // const cssRule = chain.module.rule('nomorlCss').oneOf('0').use('postcss-loader')
      // console.log('xxxx', cssRule)
      

      chain.module
      .rule('nomorlCss')
      .oneOf('0')
      .use('2')
        .tap(options => {
          return {
            ...options,
            postcssOptions: {
              plugins: [
                ...options.postcssOptions.plugins,
                postcssEnv({
                  preserve: false,
                  importFrom: ['src/assets/style/global.css'],
                  features: {
                    'nesting-rules': true,
                  }
                }),
              ]
            }
          }
        })

      // chain.merge({
      //   module: {
      //     rule: {
      //       testCss: {
      //         test: /\.(css|wxss|acss|ttss)(\?.*)?$/,
      //         use: [{
      //           loader: 'postcss-loader',
      //           options: {
      //             postcssOptions: {
      //               plugins: [
      //                 [
      //                   'postcss-preset-env',
      //                   {
      //                     // Options
      //                   },
      //                 ],
      //               ],
      //             },
      //           }
      //         }]
      //       }
      //     }
      //   }
      // })
      // console.log('chain', chain.module.rules.store.get('testCss'))
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
