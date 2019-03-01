/*const loggerClass = require('./event');
const client= new loggerClass();

client.on('messageLogged',function(){
    console.log('Event Received');
});

client.log("message123");*/

var v2 = require('./event')
const v3 = new v2.l1();
v3.on('ss',function(){
    console.log('Ack');
})

v3.abc('messagae');
