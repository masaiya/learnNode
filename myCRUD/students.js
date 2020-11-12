/**
 * 数据操作文件模块
 */
var fs = require('fs');
const { resolve, parse } = require('path');
const { PassThrough } = require('stream');
var dbPath = './db.json';

/**
 * 获取所有学生信息列表
 */

exports.getAll = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile(dbPath, function(err, data) {
      if(err) {
        reject(err)
      }
      var fileData = JSON.parse(data).students;
      resolve(fileData);
    })
  })
}

exports.getOne = function(id) {
  return new Promise(function(resolve, reject) {
    fs.readFile(dbPath, function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      var stu = students.find(function(item) {
        return item.id === parseInt(id);
      })
      console.log(stu);
      resolve(stu);
    })
  })
}

exports.update = function(student) {
  return new Promise(function(resolve, reject) {
    fs.readFile(dbPath, function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      var stu = students.find(function(item) {
        return item.id === parseInt(student.id);
      });
      for(var key in student) {
        stu[key] = student[key];
      }
      stu['id'] = parseInt(stu['id']);
      resolve(students);
    })
  }).then(res => {
    var fileData = JSON.stringify({
      students: res
    })
    fs.writeFile(dbPath, fileData, function(err) {
      if(err) {
        reject(err);
      }
      resolve('数据更改成功啦~');
    })
  })
}

exports.delete = function(id) {
  return new Promise(function(resolve, reject) {
    fs.readFile(dbPath, function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      var index = students.findIndex(function(item) {
        return item.id === parse(id);
      })
      students.splice(index, 1);
      console.log(students);
      resolve(students);
    })
  }).then(res => {
    var fileData = JSON.stringify({
      students: res
    })
    fs.writeFile(dbPath, fileData, function(err) {
      if(err) {
        reject(err);
      }
      resolve('数据删除成功啦~');
    })
  })
}

exports.save = function(student) {
  return new Promise(function(resolve, reject) {
    fs.readFile(dbPath, function(err, data) {
      if(err) {
        reject(err);
      }
      var students = JSON.parse(data).students;
      if(students.length >= 1) {
        student.id = parseInt(students[students.length - 1].id + 1);
      } else {
        student.id = 1;
      }
      students.push(student);
      resolve(students);
    })
  }).then(res => {
    var fileData = JSON.stringify({
      students: res
    })
    fs.writeFile(dbPath, fileData, function(err) {
      if(err) {
        reject(err);
      }
      resolve('数据写入成功啦~');
    })
  })
}