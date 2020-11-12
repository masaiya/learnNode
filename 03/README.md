# 模块系统
使用 Node 编写应用程序主要就是在使用：
- EcmaScript 语言
  - 和浏览器不一样，Node 中没有 BOM DOM
- 核心模块
  - 文件操作的 fs
  - http服务的 http
  - url 路径操作模块
  - path 路径处理模块
  - os 操作系统信息
- 第三方模块
  -  art-template
  - 第三方模块需要通过 npm 来下载才可以使用
- 自己写的模块

# 模块化
- 文件作用域
- 通信规则
  - 加载 require
  - 导出 

# CommonJS 模块规范
JavaScript 本身是不支持模块化的
在 Node 中 JavaScript 是模块系统
- 模块作用域
- 使用 require 方法来加载模块
- 使用 exports 接口对象用来导出模块中的成员

### 加载 `require`
语法：
```javascript
var 自定义变量名称 = require('模块');
```
两个作用：
- 执行被加载模块中的代码
- 得到被加载模块中的 `exports` 导出接口对象

### 导出 `exports`
- Node 中是模块作用域，默认文件中的所有成员只在当前文件模块有效
- 对于希望可以被其他模块访问的成员，我们需要把这些公开的成员都挂载到 `exports` 接口对象中
导出多个成员：必须在对象中
```javascript
exports.a = 123;
exports.b = function() {}
```
导出单个成员：拿到的就是函数、字符串
```javascript
module.exports = 'hello';
```

# 模块查找机制
- 优先从缓存加载
- 核心模块
- 路径形成的文件模块
- 第三方模块
