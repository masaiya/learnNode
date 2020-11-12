# 在 Express 中配置使用 art-template 模板引擎
1. 安装
```javascript
npm install --save art-template
npm install --save express-art-template
```
2. 配置
```javascript
// 配置使用 art-template 模板引擎
// 第一个参数： 当渲染以 .html 结尾的文件的时候，使用 art-template 模板引擎
// express-art-template 是专门用来在 Express 中把 art-template 整合到 Express 中
app.engine('html', require('express-art-template'));
```
3. 使用
```javascript
// Express 为 Response 响应对象提供了一个方法： render
// render 方法默认不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定，开发人员把所有的视图文件放到 views 目录中
app.get('/', function(req, res) {
  res.render('index.html', {
    comments: comments
  })
})
```

# 在 Express 获取表单 POST 请求体数据
在 Express 中没有内置获取表单 POST 请求体的 API，这里我们需要使用一个第三方包： `body-parser`
1. 安装
```javascript
npm install --save body-parser
```
2. 配置
```javascript
// 引包
var bodyParser = require('body-parser');
// 配置 body-parser
// 只要加入这个配置，就会在 req 请求对象上多出来一个属性： body
// 也就是说我们可以直接通过 req.body 来获取表单 POST 请求体数据了
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.join())
```
3. 使用
```javascript
req.body
```