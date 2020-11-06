var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function(req, res) {
  var url = req.url;
  if(url === '/') {
    fs.readFile('./01/resource/index.html', function(err, data) {
      if(err) {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('文件读取失败，请稍后重试~');
      } else {
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        res.end(data);
      }
    })
  } else if(url === '/pic') {
    fs.readFile('./01/resource/3.jpg', function(err, data) {
      if(err) {
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('文件读取失败，请稍后重试~');
      } else {
        // 图片不需要指定编码，我们常说的编码是指：字符编码
        res.setHeader('Content-Type', 'image/jpg');
        res.end(data);
      }
    }) 
  } 
})

server.listen(3000, function() {
  console.log('Server is running ...');
})