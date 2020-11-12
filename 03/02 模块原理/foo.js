/**
 * 在 Node 中，每个模块内部都有一个自己的 module 对象
 * 该 module 对象中，有一个成员叫 exports，也是一个对象
 */

// var module = {
//   exports: {
//     foo: 'bar'
//   }
// }
module.exports.foo = 'bar';
/**
 * 谁来 require 这个js，谁救得到 module.exports
 * 默认在代码的最后有一句：
 * return module.exports;
 */