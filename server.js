// imports the http, fs, url model
const http = require('http'),
fs = require('fs'),
url = require('url');

//.createServer = function from the http model
//(request, response) = the two arguments of the function passed into createServer();
http.createServer((request, response) => {
  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  //Parse the request.url to determine if the URL contains the word “documentation”
  if (q.pathname.includes('documentation')) {
    // If it does, return the “documentation.html” file to the user
    filePath = (_dirname + '/documentation.html');
  } else {
    //otherwise return the “index.html” file
    filePath = "index.html";
  }
  //For all requests coming in to your “server.js” file, use the fs module to log both the request URL and a timestamp to the “log.txt” file.
  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp ' + new Date() + '\n\n', function(err) {
    if (err) {
      throw err;
    } 
  });
  //listens for a response on port 8080
}).listen(8080);
