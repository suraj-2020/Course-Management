
const http = require('http');
const server = new http.createServer((req, res) => {
    if(req.url === '/') {                            // '/' -> default uri also we can write some specific path like /abc
        res.write('Welcome to http module');        //response send back by server
        res.end();                                  //closing the server stream
    }
});

server.on('connection', () => {  //listens to the new or refreshed connection
    // connect to an origin server
    console.log("A New Connection established");
  });

server.listen(3000);
console.log('Listening on Port 3000');