# 文件操作路径和模块路径
文件操作路径：
要么省略 ./，要么不省略
```javascript
fs.readFile('04/data/a.txt', function(err, data) {
  if(err) {
    console.log(err);
    return console.log("读取失败");
  }
  console.log(data.toString());
})

fs.readFile('./04/data/a.txt', function(err, data) {
  if(err) {
    return console.log("读取失败");
  }
  console.log(data.toString());
})
```
模块操作路径：
```javascript
require('/data/foo.js')
require('./data/foo.js')
```

# 修改完代码自动重启
在这里我们可以使用一个第三方命令行工具： nodemon 来帮助我们解决频繁修改代码重启服务器问题
`nodemon` 是一个基于 NdeJs 开发的，使用的时候需要独立安装
```javascript
npm install --global nodemon
```
安装完毕之后，使用：
```javascript
node app.js
// 使用nodemon
nodemon app.js
```
只要通过 nodemon app.js 启动的服务，则他会监视你的文件变化，当文件发生变化时，自动帮你重启服务器