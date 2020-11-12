var fs = require('fs');

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