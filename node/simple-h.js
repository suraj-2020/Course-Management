const http = require('http');
var ser= new http.createServer((req,res)=>{
    if(req.url=='/addcourse')
    {
        res.write("hello");
        console.log(req.url);
        res.end();
    }
})
ser.on('connection',()=>{
    console.log('connected');
})
ser.listen(3000);