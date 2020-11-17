var express = require('express');
var app = express();

// 当请求进来，会从第一个中间件开始进行匹配
//    如果匹配，则进来
//       如果请求进入中间件之后，没有调用 next 则代码会停在当前中间件
//       如果调用了 next 则继续向后找到第一个匹配的中间件
//    如果不匹配，则继续判断匹配下一个中间件


// 中间件：处理请求的，本质还是函数
/**
 * 中间件本质是函数，可接受三个参数： 
 * Request: 请求对象
 * Response: 响应对象
 * next: 下一个中间件
 * 当一个请求进入一个中间件之后，如果不调用 next 则会停留在当前中间件
 * 所以 next 是一个方法，用来调用下一个中间件的
 * 调用 next 方法也是要匹配的（不是调用紧挨着的那个）
 */
// app.use(function(req, res, next) {
//   console.log("1");
  
// })
// app.use(function(req, res, next) {
//   console.log("2");
//   next();
// })


// 在Express中， 对中间件有分类：
//  1. 不关心请求路径和请求方法的中间件（任何请求都会进入到这个中间件）
// app.use(function(req, res) {
//   console.log("不关心请求路径和请求方法的中间件");
// }) 


//  2.关心请求路径的中间件
// 以 /xxx 开头的路径中间件
app.use('/a', function(req, res, next) {
  console.log("关心请求路径的中间件");
})

//  3.严格匹配请求方法和请求路径的中间件
app.get('/', function(req, res, next) {
  console.log("严格匹配请求方法和请求路径的中间件 get");
})
app.get('/', function(req, res, next) {
  console.log("严格匹配请求方法和请求路径的中间件 post");
})

// 如果没有能匹配的中间件，则 Express 会默认输出：Cannot GET 路径
app.listen(3000, function() {
  console.log("running...");
})