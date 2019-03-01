/*const EventEmitter= require('events');
const emitter= new EventEmitter();

emitter.on('MessageRaised', function(){
    console.log('Event A');
});

emitter.emit('MessageRaised');

const EventEmitter = require('events');

class logger extends EventEmitter{
    abc(message){
        console.log("iam"+message);
        this.emit('messageLogged');
    }
};
*/
//---------------------------------------------------------------------------
/*
const EventEmitter = require('events');

class logger extends EventEmitter{
    abc(msg){                         //why not write funtion abc() ?
        console.log(msg);
        this.emit('func');
    }
}
module.exports = logger;
-------------------------------------------------------------------------------------
*/
var v1 = require('events');

class logger extends v1.EventEmitter{
    abc(msg)
    {
        console.log(msg);
        this.emit('ss');
    }
}
module.exports.l1= logger;

