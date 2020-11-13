/**
 * 路由模块：处理路由，根据不同的请求方法+请求路径设置具体的请求处理函数
 */
var fs = require('fs');
// Express 提供了 Router 用来更好的打包路由
var express = require('express');
var Students = require('./students');
const { isRegExp } = require('util');

// 1. 创建一个路由容器
var router = express.Router();

// 2.把路由都挂在到 router 路由容器中
router.get('/', function(req, res) {
  res.redirect('/students');
})

// router.get('/students', function(req, res) {
//   Students.getAll().then(data => {
//     res.render('index.html', {
//       students: data
//     })
//   }).catch(err => {
//     res.status(500).send('Server error.');
//   })
// })

router.get('/students', function(req, res) {
  Students.find(function(err, students) {
    if(err) {
      return res.status(500).send('Server error.');
    }
    res.render('index.html', {
      students: students
    })
  })
})

router.get('/students/new', function(req, res) {
  res.render('new.html');
})

// router.post('/students/new', function(req, res) {
//   var student = req.body;
//   Students.save(student).then(data => {
//     res.redirect('/');
//   }).catch(err => {
//     res.status(500).send('Server error.');
//   })
// }) 

router.post('/students/new', function(req, res) {
  var student = req.body;
  new Students(student).save(function(err) {
    if(err) {
      console.log(err);
      return res.status(500).send('Server error.');
    }
    res.redirect('/students');
  });
})

// router.get('/students/edit', function(req, res) {
//   var id = req.query.id;
//   Students.getOne(id).then(data => {
//     res.render('edit.html', {
//       student: data
//     })
//   }).catch(err => {
//     return res.status(500).send('Server error.');
//   })
// })

router.get('/students/edit', function(req, res) {
  var id = req.query.id.replace(/"/g, '');
  console.log(id);
  Students.findById((id), function(err, student) {
    if(err) {
      return res.status(500).send('Server error.');
    }
    res.render('edit.html', {
      student: student
    })
  })
})

// router.post('/students/edit', function(req, res) {
//   var student = req.body;
//   Students.update(student).then(data => {
//     res.redirect('/');
//   }).catch(err => {
//     res.status(500).send('Server error.');
//   })
// })
router.post('/students/edit', function(req, res) {
  var id = req.body.id.replace(/"/g, '');
  var student = req.body;
  Students.findByIdAndUpdate(id, student, function(err) {
    if(err) {
      return res.status(500).send('Server error.');
    }
    res.redirect('/');
  })
})

// router.get('/students/delete', function(req, res) {
//   var id = req.query.id;
//   Students.delete(id).then(data => {
//     res.redirect('/');
//   }).catch(err => {
//     res.status(500).send('Server error.');
//   })
// })
router.get('/students/delete', function(req, res) {
  var id = req.query.id.replace(/"/g, '');
  Students.findByIdAndDelete(id, function(err) {
    if(err) {
      return res.status(500).send('Server error.');
    }
    res.redirect('/');
  })
})

// Express 对于没有设定的请求路径，默认会返回 Can not get XXX
// 如果想要定制 404 页面，需要通过中间件来配置
router.use(function(req, res) {
  // 所有未处理的请求路径都会来到这里
})
// 3. 把 router 导出
module.exports = router;