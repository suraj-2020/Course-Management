
var request = require('request');
var promise = new Promise( (resolve,reject)=>{request.get('https://www.reddit.com/r/funny.json',function(err,response,body){
if(err)
reject(err);    
let j=JSON.parse(body);
console.log(j);
resolve(j)
})});
promise.then()=>console.log().catch()


/*
const prom = new Promise(function (resolve, reject) {
    setTimeout(()=>{// PROMISE  , 
        resolve('Success');
        reject(new Error('Failure'));
    },2000);
});


prom
.then((result)=>console.log(result))
.catch((err)=>console.log(err.message));
*/



