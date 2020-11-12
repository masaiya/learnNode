var http = require('http');
var fs = require('fs');
var template= require('art-template');
var url = require('url');

// 为了方便的统一处理这些静态资源，我们约定把所有静态资源放在 public 目录中

var server = http.createServer();

var comments = [
  {
    name: '张三',
    message: '今天天气好',
    date: '2020-11-6'
  },
  {
    name: '李四',
    message: '今天天气好',
    date: '2020-11-6'
  },
  {
    name: '王五',
    message: '今天天气好',
    date: '2020-11-6'
  },{
    name: '田六',
    message: '今天天气好',
    date: '2020-11-6'
  }
]

server.on('request', function(req, res) {
  // 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象(通过query属性来访问)
  var parseObj = url.parse(req.url, true);
  // 单独获取不包含查询字符串的路径部分
  var pathname = parseObj.pathname;
  if(pathname === '/') {
    fs.readFile('./02/feedback/view/index.html', function(err, data) {
      if(err) {
        return res.end('404 Not Found.');
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr.toString());
    }) 
  } else if(pathname.indexOf('/public/') === 0) {
    /**
     * 统一处理：
     * 如果请求路径是以 /public/ 开头的，则认为要获取public中的某个资源
     * 所以可以直接把请求路径当做文件路径来直接进行读取
     */
    fs.readFile('./02/feedback' + pathname, function(err, data) {
      if(err) {
        console.log("11111:");
        console.log(err);
        return res.end('404 Not Found.');
      }
      res.end(data);
    });
  } else if(pathname === '/post') {
    fs.readFile('./02/feedback/view/post.html', function(err, data) {
      if(err) {
        return res.end('404 Not Found.');
      }
      res.end(data);
    })
  } else if(pathname === '/pinglun') {
    var comment = parseObj.query;
    comment.date = '2020-11-10';
    comments.unshift(comment);
    // res.end(JSON.stringify(comments));
    /**
     * 如何通过服务器让客户端重定向?
     *  1. 状态码设置为 302 临时重定向
     *        statusCode
     *  2. 在响应头中通过 Location 告诉客户端往哪儿重定向
     *        setHeader
     *  如果客户端发现收到了服务器的响应的状态码是 302 就会自动去响应头中找 Location 
     */
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  } 
  else {
    fs.readFile('./02/feedback/view/404.html', function(err, data) {
      if(err) {
        return res.end('404 Not Found.');
      }
      res.end(data);
    })
  }
}) 

server.listen(3000, function() {
  console.log("Server is running...");
})

