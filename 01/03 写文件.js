var fs = require('fs');

/**
 * 写文件参数：
 * 第一个参数： 文件路径
 * 第二个参数： 文件内容
 * 第三个参数： 回调函数 
 */
fs.writeFile('./01/write.md', '这是通过fs.writeFile写进去的~', function(error) {
  if(error) {
    console.log("写入文件失败了~");
    return;
  }
  console.log("写入成功！");
})