var http = require('http');
var fs = require('fs');

var  server = http.createServer();

var wwwDir = 'D:/document/learnNode/02/www'

server.on('request', function(req, res) {
  console.log("接收到客户端的请求~");
  fs.readFile('./02/template.html', function(err, data) {
    if(err) {
      return res.end('404 Not Found.');
    }
    // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
    // 2. 如何就得到的文件名和目录名替换到template中
    fs.readdir(wwwDir, function(err, files) {
      if(err) {
        return res.end('Can not find www dir.');
      }
      console.log(files);
    })
    res.end(data);
  })
});

server.listen(3000, function() {
  console.log('Serve is running...');
})