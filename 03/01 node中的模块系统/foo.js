var foo = 'bar';

function add(x, y) {
  return x + y;
}
/**
 * 只能得到想要给出的成员
 * 目的是解决变量命名冲突的问题
 */
exports.add = add;
/**
 * exports 是一个对象
 * 我们可以通过多次为这个对象添加成员实现导出
 */

 // 如果一个模块需要直接导出某个成员，而非对象
 module.exports = add;