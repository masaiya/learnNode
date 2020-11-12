// 1. 导入express
var express = require('express');

// 2. 创建服务器应用程序
var app = express();

// 提供静态资源服务，公开指定目录
app.use('/public/', express.static('./express/public/'))

// 当服务器发起get请求 '/'时
app.get('/', function(req, res) {
  res.send('hello express');
})
app.get('/about', function(req, res) {
  res.send('hello about')
})

// 相当于 server.listen
app.listen(3000, function() {
  console.log('app is running at port 3000.');
})