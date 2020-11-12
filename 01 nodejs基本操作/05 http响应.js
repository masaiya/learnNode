// 1. 加载 http 核心模块
var http = require('http');

// 2. 使用 http.createServer() 方法创建一个 Web 服务器
var server = http.createServer();

//3. 注册 request 请求事件，当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行回调函数
/**
 * 回调函数需要接受两个参数：
 *  Request 请求对象
 *    请求对象可以用来获取客户端的一些请求信息，例如请求路径
 *  Response 响应对象
 *    响应对象可以用来给客户端发送响应消息
 */
server.on('request', function(request, response) {
  console.log("收到客户端的请求了");
  console.log("请求路径是: " + request.url);

  // response 对象有一个方法： write 可以用来给客户端发送响应数据
  // write 可以使用多次，但是最后一定要使用 end 来结束响应，否则客户端会一直等待
  response.write('hello');
  response.write(" nodejs");
  // 结束响应
  response.end();
});

// 4. 绑定端口号，启动服务器
server.listen(3000, function() {
  console.log("服务器启动成功，可以通过http://127.0.0.1:3000/ 来进行访问");
})


  // 由于我们目前的服务器的能力还非常的弱，无论什么请求，都只会响应 hello nodejs
  // 思考: 根据不同的路径响应不同的结果
  