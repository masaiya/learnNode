var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use('/public/', express.static('./public/'))

// 配置使用 art-template 模板引擎
// 第一个参数： 当渲染以 .art 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
app.engine('html', require('express-art-template'));

// Express 为 Response 响应对象提供了一个方法： render
// render 方法默认不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定，开发人员把所有的视图文件放到 views 目录中

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.get('/', function(req, res) {
  res.render('index.html', {
    comments: comments
  })
})

app.get('/post', function(req, res) {
  res.render('post.html')
})

// 当以 POST 请求 /post 的时候，执行指定的处理函数
// 这样的话我们就可以利用不同的请求方法让一个请求路径使用多次
app.post('/post', function(req, res) {
  // 1. 获取表单 post 请求提数据
  // 2. 处理
  // 3. 处理响应
  var comment = req.body;
  comment.date = '2020-11-11';
  comments.unshift(comment);
  res.redirect('/');
})
// app.get('/pinglun', function(req, res) {
//   var comment = req.query;
//   comment.date = '2020-11-11';
//   comments.unshift(comment);
//   res.redirect('/');
// })

app.listen(3000, function() {
  console.log("running ...");
})