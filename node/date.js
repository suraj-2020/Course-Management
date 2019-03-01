var today = new Date();
/*var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
} 

today = mm + '/' + dd + '/' + yyyy;*/
console.log(today);

var d = new Date("March 12,2019");
console.log(d);
if(d<today)
console.log("less");
else
console.log("more");