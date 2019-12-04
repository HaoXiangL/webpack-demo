const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    //重命名为main
    main: './src/index.js',
    // sub: './src/index.js'
  },
  //module = 遇到文件类型，如何打包
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
          //输出路径
          outputPath: 'images/',
          //如果小于25k，已base64打包到打包文件里
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
      //处理icon矢量图 字体文件
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
    },
    {
      test: /\.js$/,
      //不对在node_modules的代码进行babel转译
      exclude: /node_modules/,
      loader: "babel-loader",
      // options: {
      //在使用库文件时需要用@babel/plugin-transform-runtime
      // presets: [["@babel/preset-env",{
      //   corejs: 2,
      //   targets: {
      //     chrome: "67",//chrome大于67版本不需要加载
      //   },
      //   useBuiltIns: 'usage'//useBuiltIns可以按需加载
      // }]]
      // }
    }
  ]
  },
  //plugin可以在webpack运行某个时刻，帮你处理sth
  //HtmlWebpackPlugin会在打包结束后生成一个html文件，并把打包生成的js自动引入到这个html文件
  plugins :[
    new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      //打包前删除之前的目录下的文件
    new CleanWebpackPlugin()
  ],

  output: {
    //固定前缀地址
    // publicPath: 'http://cdn.com.cn',
    filename: 'bundle.js',
    //使用[name]占位符，可以保证不会输出同名js
    // filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}