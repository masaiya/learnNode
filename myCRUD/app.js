var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use('/public/', express.static('./public'));
app.use('/node_modules/', express.static('./node_modules'));

app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 把路由容器挂在到 app 服务中
app.use(router);

app.listen(3000, function() {
  console.log("Running...");
})