const path = require("path")
const express = require("express")
const webpack = require("webpack")
const opn = require('opn')

// 热更新相关包
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-Hot-middleware")
const webpackConfig = require('./webpack.dev.js')

const app = express(),
    DIST_DIR = path.join(__dirname, "dist"), // 设置静态访问文件路径
    PORT = 4396, // 设置启动端口
    complier = webpack(webpackConfig)

// 热更新，编译compiler
let devMiddleware = webpackDevMiddleware(complier, {
  // publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  quiet: false,
  lazy: false,
  watchOptions: {
    poll: true
  },
  stats: {
    colors: true
  }})

// 配合热更新使用
let hotMiddleware = webpackHotMiddleware(complier,
  {
  log: false,
  heartbeat: 2000,
}
)
app.use(devMiddleware)

app.use(hotMiddleware);


app.use(express.static(DIST_DIR))
app.listen(PORT,function(){
  console.log("成功启动：localhost:"+ PORT)
  opn(`http://localhost:${PORT}`)
})