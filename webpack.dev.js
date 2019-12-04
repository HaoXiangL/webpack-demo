const webpack = require('webpack')
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development', //development || production
  //sourceMap配置(映射index.js和bundle.js的代码行数关系，报错更具体到哪行)
  devtool: 'cheap-module-eval-source-map',//development使用这个更好 cheap=不带列信息，只带行信息，不包含module代码
  //module=对loader生成sourcemap  eval=执行方式 source-map=生成sourcemap文件
  // devtool: 'cheap-module-source-map', //production使用这个更好

   //devServer可以实现启动服务器，更改代码后不用刷新也可更新
   devServer:{
    //启动地址
    contentBase: './dist',
    //自动打开浏览器,自动访问地址
    open: true,
    //端口
    port:8080,
    //开启HotmModuleReplacement功能
    hot: true,
    //防止浏览器刷新
    // hotOnly:true
  },
  //plugin可以在webpack运行某个时刻，帮你处理sth
  //HtmlWebpackPlugin会在打包结束后生成一个html文件，并把打包生成的js自动引入到这个html文件
  plugins :[
    //webpack的热启动模块
    new webpack.HotModuleReplacementPlugin()],
    //优化
    optimization: {
      //只使用import的模块(development才需要配置)
      usedExports: true
    }
}

module.exports = merge(commonConfig, devConfig)