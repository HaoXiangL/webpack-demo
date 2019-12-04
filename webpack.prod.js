const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')

const prodConfig = {
  mode: 'production', //development || production
  //sourceMap配置(映射index.js和bundle.js的代码行数关系，报错更具体到哪行)
  devtool: 'cheap-module-source-map',//development使用这个更好 cheap=不带列信息，只带行信息，不包含module代码
  //module=对loader生成sourcemap  eval=执行方式 source-map=生成sourcemap文件
  // devtool: 'cheap-module-source-map', //production使用这个更好


}

module.exports = merge(commonConfig,prodConfig);