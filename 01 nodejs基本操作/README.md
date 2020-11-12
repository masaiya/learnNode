# Node.js
  - Node 是 JavaScript 运行时环境
  - Node 既不是语言，也不是框架，它是一个平台

# Node.js 中的 JavaScript
  - 没有BOM DOM
  - EcmaScript 基本的 JavaScript 语言部分
  - 在 Node 中为 JavaScript 提供一些服务器级别的 API
    - 文件操作的能力
    - http 服务的能力  

# 文件读写
var fs = require('fs');
fs.readFile('', function(error, data) {
})
fs.writeFile('', '', function(error) {
})

# 简单的 Web 服务器
1. 加载 http 核心模块
   var http = require('http');
2. 使用 http.createServer() 方法创建一个 Web 服务器
   var server = http.createServer();

3. 注册 request 请求事件，当客户端请求过来，就会自动触发服务器的 request 请求事件，然后执行回调函数
server.on('request', function(request, response) {
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

# 核心模块
Node 为 JavaScript 提供了很多服务器级别的 API, 这些 API 绝大多数都被包装到了一个具名的核心模块中了。
例如：文件操作的 `fs` 核心模块， http服务构建的 `http`模块， `path`路径操作模块，`os`操作系统信息模块。。。。

```javascript
var fs = require('fs');
```

# 模块系统
require 是一个方法,它的作用是用来加载模块的
在 Node 中，没有全局作用域，只有模块作用域
在 Node 中，模块有三种:
- 具名的核心模块，例如：fs, http
- 用户自己编写的文件模块  相对路径必须加 ./
- 可以省略后缀名


存在模块作用域，模块和模块之间是如何通信的？
- 有时候，我们加载文件模块的目的不是为了简简单单的执行里面的代码，更重要的是为了使用里面的某个成员
- require 方法有两个作用
  - 1. 加载文件模块并执行里面的代码
  - 2. 拿到被夹在文件模块导出的接口对象
- 在每个文件模块中都提供了一个对象：`exports`
- `exports` 默认是一个空对象

# ip地址和端口号
- ip 地址用来定位计算机
- 端口号用来定位具体的应用程序
- 所有需要联网通信的应用程序都会占用一个端口号
- 可以同时开启多个服务，但一定要确保不同服务占用的端口号不一致