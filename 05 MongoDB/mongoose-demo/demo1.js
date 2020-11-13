const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// 创建一个模型
const Cat = mongoose.model('Cat', { name: String });


for(var i=0;i<100;i++) {
  // 实例化一个 Cat
  const kitty = new Cat({ name: '喵喵' + i});
  // 持久化保存 kitty 实例
  kitty.save().then(() => console.log('喵喵' + i));
}