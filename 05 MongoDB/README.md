# MongoDB 
### MongoDB 数据库的基本概念
- 数据库： 可以有多个数据库
- 集合： 一个数据库中可以有多个集合（表）
- 文档： 一个集合中可以有多个文档（表记录—）
- 文档结构很灵活，没有任何限制

### 关系型数据库和非关系型数据库
关系型数据库：
- 所有的关系型数据库都需要通过 `sql` 语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 数据表还支持约束
非关系型数据库：
- 灵活
- 简单的非关系数据库就是 key-value
- MongoDB是最像关系型数据库的非关系型数据库
  - 数据库 --> 数据库
  - 数据表 --> 集合（数组）
  - 表记录 --> （文档对象）
- MongoDB不需要设计数据表

### 启动和关闭数据库
- 启动
  - mongodb 默认使用执行 mongod 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录
  - 所以在第一次执行该命令之前自己手动创建一个 /data/db
```
mongod
```

### 连接数据库
- 该命令默认连接本机的 MongoDB 服务
```
mongo
```
- 退出：
```
exit
```

### 基本命令
- `show dbs`
  - 查看显示所有数据库
- `db`
  - 查看当前操作的数据库
- `use 数据库名称` 
  - 切换到指定的数据库（如果没有会新建）
- 插入数据
```shell
db.students.insertOne({"name":"pipi"})
```

### 在 Node 中如何操作 MongoDB 数据
1. 使用官方的 `mongodb` 包来操作
- 原生的，使用复杂
2. 使用第三方 `mongoose` 来操作 MongoDB 数据库


### mongoose 起步
```javascript
// 安装
npm i mongoose

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

### 官方指南
1. 设计 Scheme  发布model
```javascript
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// 1. 连接数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/itcast');

// 2. 设计集合结构（表结构）
// 字段名称就是表结构中的属性名称
// 约束的目的： 保证数据的完整性，不要有脏数据
var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: string
  }
});

// 3. 将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为 model
// 第一个参数： 传入一个大写名词单数字符串用来表示你的数据库名称
//              mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//              例如这里的 User 最终会变为 users 集合名称
// 第二个参数： 模型构造函数
var User = mongoose.model('User', userSchema);

// 4. 当我们有了模型构造函数之后，就可以使用这个构造函数对 users 集合中的数据进行增删改查了

```

2. 增加数据
```javascript
var admin = new User({
  username: 'admin',
  password: '123456',
  email: 'admin@admin.com'
})

admin.save(function(err, ret) {
  if(err) {
    console.log("保存失败");
  } else {
    console.log("保存成功");
    console.log(ret);
  }
})
```

3. 查询数据
查询所有：
```javascript
User.find(function(err, ret) {
  if(err) {
    console.log("查询失败");
  } 
  console.log(ret);
  console.log("查询成功");
})
```

按条件查询：
```javascript
User.findOne({
  username: 'zs'
},function(err, ret) {
  if(err) {
    console.log("查询失败");
  } 
  console.log(ret);
  console.log("查询成功");
})
```


4. 删除数据
```javascript
User.remove({
  username: 'zs'
}, function(err, ret) {
  if(err) {
    console.log("删除失败");
  } else　{
    console.log("删除成功");
  }
})
```

5. 更新数据