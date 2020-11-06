/**
 * art-template
 * art-template 不仅可以在浏览器中使用，也可以在 node 中使用
 * 在 node 中使用 art-template 模板引擎
 */

var http = require('http');
var template = require('art-template');
var fs = require('fs');

var server = http.createServer();

server.on('request', function(req, res) {
  console.log('接收到客户端的请求~');

  fs.readFile('./02/tpl.html', function(err, data) {
    if(err) {
      return console.log("读取文件失败了");
    }
    var ret = template.render(data.toString(), {
      name: 'Pipi',
      age: 18,
      province: '陕西',
      hobbies: ['play', 'sing', 'dance']
    })
    res.end(ret);
  })
})

server.listen(3000, function() {
  console.log('Server is running...');
})