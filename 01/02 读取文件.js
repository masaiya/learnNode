// 1. 使用 require 方法加载 fs 核心模块
var fs = require('fs');

// 2. 读取文件
//  第一个参数就是要读取的文件路径
//  第二个参数就是一个回调函数
//      error  成功： null   失败：错误对象
//      data   成功： 数据   失败：null
fs.readFile('./01/README.md', function(error, data) {
  console.log(data.toString());
})