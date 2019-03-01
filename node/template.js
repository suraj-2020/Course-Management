var express = require('express')
var app = express();
app.use(express.urlencoded({extended :true})); // to use form data
app.set('views','./temp');// views is template, ./ is folder name     
app.set("view engine","pug");// uses pug module for dynamic change in file
course=[]
password=[]
app.get("/course",function(req,res){
    //csonsole.log("Courses added",JSON.stringify(course))
    res.render("course",{"appName" : "RestApi"})//instead of send to render a html
}).listen(3000);
app.post("/add",(req,res)=>{
    course.push(req.body.course) //JSON therefore ccess by name
    password.push(req.body.pass)
    res.render('course',{
        "cname": [JSON.stringify(course),JSON.stringify(password)]}); // if passing entire body then use this else this is string
})