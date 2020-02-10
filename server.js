// imports the http model
const http = require('http'),
fs = require('fs'),
url = require('url');

//.createServer = function from the http model
//(request, response) = the two arguments of the function passed into createServer();
http.createServer((request, response) => {
  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (_dirname + '/documentation.html');
  } else {
    filePath = "index.html";
  }

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp ' + new Date() + '\n\n', function(err) {
    if (err) {
      throw err;
    } else {
      console.log('added to log');
    }
  })
  //listens for a response on port 8080    
}).listen(8080);
