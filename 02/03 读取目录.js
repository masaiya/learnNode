var fs = require('fs');

fs.readdir('D:/document/learnNode/02/www', function(err, files) {
  if(err) {
    return console.log('目录不存在');
  }
  console.log(files);
})