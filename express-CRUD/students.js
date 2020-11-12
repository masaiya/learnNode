/**
 * students.js 数据操作文件模块
 * 职责：
 *    操作文件中的数据，只处理数据，不关心业务
 */
var fs = require('fs');

var dbPath = './db.json';
/**
* 获取所有学生信息列表
  return []
*/
exports.getAll = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      resolve(JSON.parse(data).students);
    })
  })
}
/**
* 获取某一个学生的信息
  return []
*/
exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      var ret = students.find(function(item) {
        return item.id == id;
      });
      resolve(ret);
    })
  })
}
/**
 * 添加保存学生信息
 */
exports.save = function(student) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      if(students.length == 0) {
        student.id = 1;
      } else {
        student.id = parseInt(students[students.length - 1].id) + 1;
      }
      students.push(student);
      var ret = JSON.stringify({
        students: students
      })
      resolve(ret);
    })
  }).then(res => {
    return new Promise(function(resolve,reject) {
      fs.writeFile(dbPath, res, function(err, data) {
        if(err) {
          reject(err);
        }
        resolve('数据保存成功啦~');
      })
    })
  })
}
/**
* 更新学生信息
*/
exports.update = function(student) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      // 你要修改谁，就要把谁找出来
      // ES6 方法：find 接受一个函数作为参数，当满足条件时，终止遍历，同时返回遍历的item
      var stu = students.find(function(item) {
        return item.id == student.id;
      })
      for(var key in student) {
        stu[key] = student[key];
      }
      var fileData = JSON.stringify({
        students: students
      })
      resolve(fileData);
    })
  }).then(res => {
    return new Promise(function(resolve,reject) {
      fs.writeFile(dbPath, res, function(err, data) {
        if(err) {
          reject(err);
        }
        resolve('数据更新成功啦~');
      })
    })
  })
}
/**
 * 删除学生信息
 */
exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      var deleteId = students.findIndex(function (item) {
        return item.id == id;
      })
      students.splice(deleteId, 1);
      resolve(students);
    })
  }).then(res => {
    return new Promise(function(resolve,reject) {
      var fileData = JSON.stringify({
        students: res
      })
      fs.writeFile(dbPath, fileData, function(err) {
        if(err) {
          reject(err);
        }
        resolve(res);
      })
    })
  }).catch(err => {
    reject(err);
  })
}