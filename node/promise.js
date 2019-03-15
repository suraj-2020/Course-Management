//var express = require('express');
//var app = express();
//app.require('Promise');
var data="pass";
const prom = new Promise((resolve,reject)=>{
        if(data!="passo")
        reject("Failed");
        resolve("Passed");
})
prom.then((data)=>{
    console.log(data);
}).catch((err)=>{
    console.log(err);
})