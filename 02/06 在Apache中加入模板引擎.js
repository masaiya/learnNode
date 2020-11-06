var http = require('http');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer();

var wwwDir = 'D:/document/learnNode/02/www';

server.on('request', function(req, res) {
  console.log("接收到了客户端的请求： " + req.url);

  fs.readFile('./02/apache.html', function(err, data) {
    if(err) {
      return res.end('404 Not Found.');
    }
    fs.readdir(wwwDir, function(err, files) {
      if(err) {
        return res.end('Can not find www dir.');
      }
      var htmlStr = template.render(data.toString(), {
        header: wwwDir,
        files: files
      })
      res.end(htmlStr);
    })
  })
})

server.listen(3000, function() {
  console.log("server is running...");
})