var express = require('express');
var Joi = require('joi')
var app = express();
app.use(express.urlencoded({extended :true})); 
app.use(express.json());
app.set('views','./views');
app.set("view engine","pug");
app.listen(3000);
app.get('/home',(req,res)=>{     //  To Load the page it takes get request
    res.render("home");
})

// DATABASE
var users={
    "u1":{"name":"Ram","password":"p1","email":"user1@gmail.com","subjects":["CSE1001","CSE1002"]}, //change this
    "u2":{"name":"Aaron","password":"p2","email":"user2@gmail.com","subjects":["CSE2001","CSE1002","CSE2002"]},
    "u3":{"name":"Rajesh","password":"password3","email":"user3@gmail.com","subjects":["CSE1001","CSE1002"]},
    "u4":{"name":"Harold","password":"password4","email":"user4@gmail.com","subjects":["CSE1001","CSE2001","CSE2002"]},
    "u5":{"name":"Eddie","password":"password5","email":"user5@gmail.com","subjects":["CSE1001","CSE2001","CSE2002"]},
    "u6":{"name":"James","password":"password6","email":"user6@gmail.com","subjects":["CSE1001","CSE2002"]},
    "u7":{"name":"Shyam","password":"password7","email":"user7@gmail.com","subjects":["CSE1001","CSE2001","CSE2002"]},
}

// Dates 
var py_date=new Date("February 27,2019");
var dbms_date=new Date("March 21,2019");
var dsa_date=new Date("February 2,2019");
var os_date=new Date("March 17,2019");
var sub={
    "CSE1001":{"studs":["u1","u3","u4","u5","u6","u7"],"Start_date":py_date,"name":"Python"},
    "CSE1002":{"studs":["u1","u2","u3"],"Start_date":dbms_date,"name":"DBMS"},
    "CSE2001":{"studs":["u2","u4","u5","u7"],"Start_date":dsa_date,"name":"Data Structure"},
    "CSE2002":{"studs":["u2","u4","u5","u6","u7"],"Start_date":os_date,"name":"Operating Systems"},
}
//USE OF MIDDLEWARE

const Schemaforsignup = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(30).required(), 
    username: Joi.string().alphanum().min(2).max(10).required()
});

function signup_val(req,res,next){
    Schemaforsignup.validate(req.body, {abortEarly: false}) //abortEarly - collect all errors not just the first one
            .then(validatedUser => {
                next();
            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });
}

const Schemaforlogin = Joi.object().keys({
    password: Joi.string().alphanum().min(0).max(30).required(),    // chanage minimum password length
    username: Joi.string().alphanum().min(2).max(10).required()
});
function login_val(req,res,next){
    Schemaforlogin.validate(req.body, {abortEarly: false}) //abortEarly - collect all errors not just the first one
            .then(validatedUser => {
                next();
            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });
}
// MIDDLEWARE ENDS

app.get('/signup',(req,res)=>{
    res.render("signup");
})
app.post('/signup',signup_val,(req,res)=>{    //  Form data send as post request.
    
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let username=req.body.username;
    let subjects=[];
    users[username]={name,password,email,subjects};
   // users.username=user;
    //console.log(users);
    res.redirect("/home");  //Create a new identical home page with count created message.
 })
app.get('/login',(req,res)=>{
    res.render("login");
})
app.post('/login',login_val,(req,res)=>{
    console.log(users);
    let user=req.body.username;
    let pass=req.body.password;
   // console.log();
    var url='/'+user+"/"+"course"
    //console.log(users.user);
    if(users[user].password == pass)
    res.redirect(url);
    else
    res.status(400).send("INCORRECT CREDENTIALS");
})
app.get('/:u1/course',(req,res)=>{
    res.render("course",{user:req.params.u1});
})

app.get('/:u1',(req,res)=>{
    res.render('account',{uid:req.params.u1,sub:sub,users:users});
})

app.post('/:u1',(req,res)=>{
    var subs=req.body.subjects;
    var uid=req.body.uid;
    // console.log(subs);
    // console.log(uid);
    u_array=users[uid].subjects;
    s_array=sub[subs].studs;
    var index = u_array.indexOf(subs);
    if (index !== -1) u_array.splice(index, 1);
    var index = s_array.indexOf(uid);
    if (index !== -1) s_array.splice(index, 1);
    console.log(users[uid].subjects);
    console.log(sub[subs].studs);
    res.render("withdrawn",{name:sub[subs].name,id:subs});
})

app.get('/:u1/course/:id',(req,res)=>{
    var cid=req.params.id;
    var uid=req.params.u1;
    var status;var numbers;
    var today = new Date();
    var start=sub[cid].Start_date;
    //console.log(start);
    var num=sub[cid].studs.length;
    var signal=0; // By default accepting students. Used to show button in pug file passed as variable
    if(today>start)
    {
        if(num<5)
        status="was cancelled due to less enrollments";
        else
        status="is currently Active accepting no more students :(";
        signal=1; // making signal zero as in ths section no enroll button would be required.
    }
    else
    status="will Start Soon, ENROLL NOW!!";
    //console.log(status);
    //console.log(cid);
    res.render("details.pug",{cid:cid,status:status,signal:signal,uid:uid});
})

app.post("/:u1/success",(req,res)=>{
    uid=req.body.uid;
    cid=req.body.cid;
    if(users[uid].subjects.includes(cid))
    res.render("Enrolled_N",{uid:uid});
    else
    {
        users[uid].subjects.push(cid);
        sub[cid].studs.push(uid);
        res.render("Enrolled_P",{name:sub[cid].name,id:cid});
    }
})