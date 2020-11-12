// 如果是非路径形式的模块标识
require('./foo.js')

// 核心模块的本质也是文件
// 核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了
require('fs');
require('http');

// 第三方模块
// 凡是第三方模块都必须通过 npm 来下载
// 使用的时候就可以通过 require('包名') 的方式来进行加载才可以使用
// 不可能有任何一个第三方包和核心模块的名字是一样的
// 既不是核心模块，也不是路径形式的模块
//  先找到当前文件所处目录的 node_modules 目录
//  node_modules/art-template
var template = require('art-template');