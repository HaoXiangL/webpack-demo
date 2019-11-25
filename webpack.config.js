const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development', //development || production
  //sourceMap配置(映射index.js和bundle.js的代码行数关系，报错更具体到哪行)
  devtool: 'cheap-module-eval-source-map',//development使用这个更好
  // devtool: 'cheap-module-source-map', //production使用这个更好
  entry: {
    //重命名为main
    main: './src/index.js',
    // sub: './src/index.js'
  },
  //devServer可以实现启动服务器，更改代码后不用刷新也可更新
  devServer:{
    contentBase: './dist',
    //自动打开浏览器,自动访问地址
    open: true
  },
  module: {
    rules: [{
      //遇到jpg|png|gif类型时
      test: /\.(jpg|png|gif)$/,
      //使用loader处理 
      use: {
        loader: 'url-loader',
        options: {
          //placeholder 占位符
          name: '[name].[ext]',
          outputPath: 'images/',
          limit: 25 * 1024
        }
      }
    },{
      test: /\.css$/,
      use: ['style-loader','css-loader']
    },{
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            //通过@import引入的文件都要走完全部loader
            importLoaders: 2,
            //开启css模块化打包(否则会有css全局化问题，影响其他模块css)
            modules: true
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    },{
      //处理icon矢量图
      test: /\.(eot|ttf|svg|woff)$/,
      //使用loader处理 
      use: {
        loader: 'file-loader',
        options: {
          //placeholder 占位符
          name: '[name].[ext]',
          outputPath: 'font/',
          limit: 25 * 1024
        }
      }
    }]
  },
  //plugin可以在webpack运行某个时刻，帮你处理sth
  //HtmlWebpackPlugin会在打包结束后生成一个html文件，并把打包生成的js自动引入到这个html文件
  plugins :[
    new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      //打包前删除之前的目录下的文件
    new CleanWebpackPlugin()],
  output: {
    //固定前缀地址
    // publicPath: 'http://cdn.com.cn',
    filename: 'bundle.js',
    //使用[name]占位符，可以保证不会输出同名js
    // filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}