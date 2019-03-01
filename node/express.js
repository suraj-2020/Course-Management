var joi = require('joi');
var express = require('express');
var app = express();
app.use(express.json())
const schema = {
    name: joi.string().required()
};
app.use((req,res,next)=>{
    if(req.headers.use=="abc")
    {
    next();}
    else
    {
        res.status(401).send("");
    }
})
app.get('/add',function(req,res){
    res.send("2");
}).listen(3000);
