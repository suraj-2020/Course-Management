var express = require('express')
var app = express()
app.listen(3000);
app.set('views','./');
app.set("view engine","pug");
var user={"u1":{"password":"p1"},
          "u2":{"password":"p2"}};
app.get("/",(req,res)=>{
  a="papa";
  res.render('test.pug',{a:a,user:user});
})