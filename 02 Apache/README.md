# 处理网站中的静态资源
- 统一处理：
- 如果请求路径是以 /public/ 开头的，则认为要获取public中的某个资源
- 所以可以直接把请求路径当做文件路径来直接进行读取
```javascript
else if(url.indexOf('/public/') === 0) {
    fs.readFile('.' + url, function(err, data) {
      if(err) {
        return res.end('404 Not Found.');
      }
      res.end(data);
    });
  }
```