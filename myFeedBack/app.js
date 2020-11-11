const fs = require('fs');
var http = require('http');
var template = require('art-template');
var url = require('url');

var server = http.createServer();
var publicPath = './myFeedBack/';
var comments = [
  {
    name: '张三',
    message: '今天天气很好~',
    date: '2020-11-10'
  }, 
  {
    name: '张三',
    message: '今天天气很好~',
    date: '2020-11-10'
  },
  {
    name: '张三',
    message: '今天天气很好~',
    date: '2020-11-10'
  },
  {
    name: '张三',
    message: '今天天气很好~',
    date: '2020-11-10'
  }
]

server.on('request', function(req, res) {
  console.log("接收到客户端的请求了~");
  var parseObj = url.parse(req.url, true);
  var pathname = parseObj.pathname;
  if(pathname === '/') {
    fs.readFile(publicPath + 'view/index.html', function(err, data) {
      if(err) {
        return res.end('404 Not Found.');
      }
      var htmlStr = template.render(data.toString(), {
        comments: comments
      })
      res.end(htmlStr);
    })
  } else if(pathname.indexOf('/public/') === 0) {
    fs.readFile(publicPath + pathname, function(err, data) {
      if(err) {
        console.log(err);
        return res.end('404 Not Found.');
      }
      res.end(data);
    })
  } else if(pathname === '/post') {
    fs.readFile(publicPath + 'view/post.html', function(err, data) {
      if(err) {
        return res.end('4040 Not Found.');
      }
      res.end(data);
    })
  } else if(pathname === '/pinglun') {
    var comment = parseObj.query;
    comment.date = '2020-11-11';
    console.log(comment);
    comments.unshift(comment);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  } else {
    fs.readFile(publicPath + 'view/404.html', function(err, data) {
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