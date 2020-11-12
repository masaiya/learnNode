/**
 * app.js 入口模块
 * 职责：
 *  启动服务
 *  做一些服务相关配置
 *    模板引擎
 *    body-parser 解析表单post请求体
 *    提供静态资源服务
 *  挂载路由
 *  监听端口强服务
 */

var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');

var app = express();

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router);

app.listen(3000, function() {
  console.log("Running ...");
})