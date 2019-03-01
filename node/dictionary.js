var data ={"_sss":{"name":"papa","password":"papa123","courses":["1001","2002"]}};
var user="u1"
var name="1001"
var pass="p1"
var courses=[]

data[user]={name,pass,courses};
console.log(data);
/*array=data["_sss"].courses;
console.log(data["_sss"].courses);
var index = array.indexOf(name);
if (index !== -1) array.splice(index, 1);
console.log(data["_sss"].courses);



/*
if(!(user in data))
{
    let courses=[];
    data.user = {name,pass,courses};
    console.log(data.user);
}
console.log(data._sss);
var c1="physics"
var c2="chemistry"
var c3="math"
data.user.courses.push(c1);
data.user.courses.push(c2);
console.log(data.user.courses);
*/
