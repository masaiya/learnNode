var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
  console.log("接受到客户端的请求~");
  console.log("请求路径是: "+ req.url);

  console.log("请求我的客户端的地址：" + req.socket.remoteAddress , req.socket.remotePort);

  // res.write('hello ');
  // res.write('nodejs');
  // res.end();
  // 上面通过write的方式比较麻烦， 可以在end的同时write
  // res.end('hello nodejs');

  /**
   * 根据不同的请求路径发送不同的响应结果
   * 1. 获取请求路径
   * 2. 判断路径处理响应
   */
  var product = [
    {
      name: '哈哈哈',
      price: 8888
    },
    {
      name: '啦啦啦',
      price: 6666
    }, 
    {
      name: '吼吼吼',
      price: 5555
    }
  ]
  var url = req.url;
  if(url === '/') {
    res.end('index page');
  } else if(url === '/login') {
    res.end('login page');
  } else if(url === '/product') {
    res.end(JSON.stringify(product))
  } else {
    res.end('404 not found');
  }
  // 相应内容只能是二进制数字或者字符串
  // 数字，对象，数组，布尔值都不行


})
server.listen(3000, function() {
  console.log("服务器启动成功，可以访问");
})