var http = require('http');
var fs = require('fs');

// 为了方便的统一处理这些静态资源，我们约定把所有静态资源放在 public 目录中

var server = http.createServer();

server.on('request', function(req, res) {
  var url = req.url;
  if(url === '/') {
    fs.readFile('./02/feedback/view/index.html', function(err, data) {
      if(err) {
        console.log(err);
        return res.end('404 Not Found.');
      }
      res.end(data.toString());
    }) 
  } else if(url.indexOf('/public/') === 0) {
    /**
     * 统一处理：
     * 如果请求路径是以 /public/ 开头的，则认为要获取public中的某个资源
     * 所以可以直接把请求路径当做文件路径来直接进行读取
     */
    fs.readFile('.' + url, function(err, data) {
      if(err) {
        console.log(err);
        return res.end('404 Not Found.');
      }
      res.end(data);
    });
  }
}) 

server.listen(3000, function() {
  console.log("Server is running...");
})

