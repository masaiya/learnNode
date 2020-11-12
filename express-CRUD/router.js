/**
 * router.js 路由模块
 * 职责：
 *    处理路由
 *    根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一，不要乱写
 * 划分模块的目的就是为了增强项目代码的可读性
 * 提高开发效率
 * 
 */
var fs = require('fs');
var Students = require('./students');

// Express 提供了一种更好的方式专门用来打包路由的
var express = require('express');

// 1. 创建一个路由容器
var router = express.Router();

// 2. 把路由都挂载到 router 路由容器中
router.get('/', function(req, res) {
  res.redirect('/students');
})

router.get('/students', function(req, res) {
  Students.getAll().then((data, err) => {
    if(err) {
      return res.status(500).send('Server error.')
    }
    res.render('index.html', {
      fruits: ['苹果', '橘子', '橙子', '香蕉'],
      students: data
    })
  })
})

router.get('/students/new', function(req, res) {
  res.render('new.html')
})

router.post('/students/new', function(req, res) {
  var student = req.body;
  // 将数据保存到 db.json 文件中用以持久化
  Students.save(student).then(data => {
    res.redirect('/');
  }).catch(err => {
    return res.status(500).send('Server error.');
  })
})


router.get('/students/edit', function(req, res) {
  var id = req.query.id;
  Students.getOne(id).then(data => {
    console.log(data);
    res.render('edit.html', {
      student: data
    })
  }).catch(err => {
    return res.status(500).send('Server error.')
  })
})

/**
 * 处理编辑学生
 */
router.post('/students/edit', function(req, res) {
  Students.update(req.body).then(data => {
    res.redirect('/');
  }).catch(err => {
    return res.status(500).send('Server error.')
  })
})

/**
 * 删除学生
 */
router.get('/students/delete', function(req, res) {
  var id = req.query.id;
  Students.delete(id).then(data => {
    res.redirect('/');
  }).catch(err => {
    return res.status(500).send('Server error.')
  })
})
// 3. 把 router 导出
module.exports = router;