var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
  console.log("接收到客户端的请求~");
  console.log("请求路径是：" + req.url);
  /**
   * 在服务端默认发送的数据，其实是 utf8 编码的内容
   * 但是浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
   * 中文操作系统默认是 gbk
   * 解决中文乱码问题的方法就是告诉浏览器，返回的内容是什么类型的
   * 在 http 协议中，Content-Type 就是用来告知浏览器发送的数据是什么类型的
   */
  // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  // res.end('hello 世界');

  var url = req.url;
  if(url === '/plain') {
    // text/plin 普通文本 
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('hello 世界');
  } else if(url === '/html') {
    // 如果你发送的是 html 格式的字符串，要告诉客户端text/html
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1><a href="javscript:;">点我</a></h1>')
  }
})

server.listen(3000, function() {
  console.log("Server is running ...");
})