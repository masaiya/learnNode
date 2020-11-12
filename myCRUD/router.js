/**
 * 路由模块：处理路由，根据不同的请求方法+请求路径设置具体的请求处理函数
 */
var fs = require('fs');
// Express 提供了 Router 用来更好的打包路由
var express = require('express');
var Students = require('./students');

// 1. 创建一个路由容器
var router = express.Router();

// 2.把路由都挂在到 router 路由容器中
router.get('/', function(req, res) {
  res.redirect('/students');
})

router.get('/students', function(req, res) {
  Students.getAll().then(data => {
    res.render('index.html', {
      students: data
    })
  }).catch(err => {
    res.status(500).send('Server error.');
  })
})

router.get('/students/new', function(req, res) {
  res.render('new.html');
})

router.post('/students/new', function(req, res) {
  var student = req.body;
  console.log(student);
  Students.save(student).then(data => {
    res.redirect('/');
  }).catch(err => {
    res.status(500).send('Server error.');
  })
})

router.get('/students/edit', function(req, res) {
  var id = req.query.id;
  Students.getOne(id).then(data => {
    res.render('edit.html', {
      student: data
    })
  }).catch(err => {
    res.status(500).send('Server error.');
  })
})

router.post('/students/edit', function(req, res) {
  var student = req.body;
  Students.update(student).then(data => {
    res.redirect('/');
  }).catch(err => {
    res.status(500).send('Server error.');
  })
})

router.get('/students/delete', function(req, res) {
  var id = req.query.id;
  Students.delete(id).then(data => {
    res.redirect('/');
  }).catch(err => {
    res.status(500).send('Server error.');
  })
})
// 3. 把 router 导出
module.exports = router;