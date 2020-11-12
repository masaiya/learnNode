// 浏览器中的 JavaScript 是不具有操作文件的能力的
// 但是 Node 中的 JavaScript 具有操作文件的能力
// - fs 是 file-system 的简写，就是文件系统的意思
// - 在 Node 中如果想要进行文件操作，就必须引入 fs 这个核心模块
// - 在 fs 这个核心模块中，就提供了所有的文件操作相关的API

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