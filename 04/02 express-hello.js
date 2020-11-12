var express = require('express');

var app = express();
app.use('/public/', express.static('./04/data'));

app.get('/', function(req, res) {
  res.send('hello express.');
})

app.listen(3000, function() {
  console.log('Server is running...');
})