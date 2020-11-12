# myCRUD

### 第一步：使用 express 框架
1. 安装 express
```javascript
npm install express --save
```
2. 使用 express
```javascript
// 导入 expree 包
var express = require('express');
// 使用
var app = express();
app.get('/', function(req, res) {
  res.send('首页');
})
// 开启端口服务
app.listen(3000, function() {
  console.log("Running...");
})
```

### 第二步：配置 router.js
1. router.js
```javascript
// Express 提供了 Router 用来更好的打包路由
var express = require('express');
// 1. 创建一个路由容器
var router = express.Router();
// 2.把路由都挂在到 router 路由容器中
router.get('/', function(req, res) {
  res.send("首页");
})
// 3. 把 router 导出
module.exports = router;
``` 
2. app.js
```javascript
var router = require('./router');
// 把路由容器挂在到 app 服务中
app.use(router);
```

### 第三步：配置 public 路径
```javascript
app.use('/public/', express.static('./public'));
app.use('/node_modules/', express.static('./node_modules'));
```

### 第四步： 配置模板引擎
1. 安装 art-template
```javascript
npm install --save art-template
npm install --save express-art-template
```
2. 配置
```javascript
app.engine('html', require('express-art-template'));
```
3. 使用
```javascript
router.get('/', function(req, res) {
  res.render('index.html', {
    students: students
  })
})
```
### 第五步：配置body-parser 解析post请求体
1. 安装
```javascript
npm install body-parser --save
```
2. 配置
```javascript
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```
3. 使用
```javascript
res.send(req.body);
```

### 设计路由
| 请求方法 |  请求路径         | get参数 | post参数                     | 备注 |
|----------|------------------|-------- |------------------------|-----|
|  GET     | /students        |         |                              |渲染首页|
|  GET     | /students/new    |         |                              |渲染添加学生页面|
|  POST    | /students/new    |         |name、age、gender、hobbies    |处理添加学生请求|
|  GET　   | /students/edit   |id       |                              |渲染编辑页面|
|  POST    | /students/edit   |         |id、name、age、gender、hobbies|处理编辑请求|
|  GET     | /students/delete |id       |                              |处理删除请求|

