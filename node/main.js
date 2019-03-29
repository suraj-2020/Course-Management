var express = require('express');
var Joi = require('joi')
var app = express();
app.use(express.urlencoded({extended :true})); //used to take input from form 
app.use(express.json());
app.set('views','./views');
app.set("view engine","pug");
app.listen(3000);
app.get('/home',(req,res)=>{  //  To Load the page it takes get request
    res.render("home");
})

active=[];
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
var py_date=new Date("February 26,2019");  //Date written in the format of new Date() to compare later
var dbms_date=new Date("March 27,2019");
var dsa_date=new Date("February 2,2019");
var os_date=new Date("March 25,2019");
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

//using two methods for same url because in the first request we render the page .
//in the second request we manipulate the data.
//if there is just a single method in which we render and do operations, then after sending data from that page it would render the page again (when clicking "submit") and then do the computation but that will be actually on a new page which will have no data 
app.get('/signup',(req,res)=>{
    res.render("signup");
})
app.post('/signup',signup_val,(req,res)=>{    //  Form data send as post request.
    
    let name=req.body.name;     //once a data is entered because "app.use(express.urlencoded({extended :true}));" is used the form data comes in body.
    let email=req.body.email;
    let password=req.body.password;
    let username=req.body.username;
    let subjects=[];
    users[username]={name,password,email,subjects};   //making a new entry in the dictionary.
    res.redirect("/home");  //Create a new identical home page with count created message.
 })
app.get('/login',(req,res)=>{
    res.render("login");   //load the pug file
})
app.post('/login',login_val,(req,res)=>{
    console.log(users);
    let user=req.body.username;
    let pass=req.body.password;
    var url='/'+user+"/"+"course"   //Making the url using username so that it remains unique to each user.
    if(users[user].password == pass)
    { // checking inputted password with saved data
        active[0]=user;
        active[1]=true;
        res.redirect(url); 
    }//redirect is a function of response. redirecting it to next url (course page/dashboard)
    else
    res.status(400).send("INCORRECT CREDENTIALS");
})
//courses
app.get('/:u1/course',(req,res)=>{
    if(req.params.u1!=active[0] || active.length==0)
    res.status(400).send("User not logged in");
    else
    res.render("course",{user:req.params.u1});  //This is how data is passed to pug file to use there.
    //url was made in previous function. so using params to get the "variable u1" from the url which will be the user logged in
})

//LAST MODIFED
app.get('/:u1',(req,res)=>{
    if(req.params.u1!=active[0] || active.length==0)
    res.status(400).send("User not logged in");
    else
    res.render('account',{uid:req.params.u1,sub:sub,users:users}); // This is the dashboard.
})
//
app.post('/:u1',(req,res)=>{
    var subs=req.body.subjects;
    var uid=req.body.uid;
    u_array=users[uid].subjects;
    s_array=sub[subs].studs;
    var index = u_array.indexOf(subs);
    var today = new Date();
    if(req.params.u1!=active[0] || active.length==0)
    res.status(400).send("User not logged in");
    else{
    if(today>sub[subs].Start_date)
    res.render("cannot",{name:sub[subs].name,id:subs});//pushing values where key is the variable which will be used in pug ( by {variabale}) and value is the variable which has the value in server side.
    else
    {
    if (index !== -1) u_array.splice(index, 1);
    var index = s_array.indexOf(uid);
    if (index !== -1) s_array.splice(index, 1);
    console.log(users[uid].subjects);
    console.log(sub[subs].studs);
    res.render("withdrawn",{name:sub[subs].name,id:subs});
    }
    }
})

app.get('/:u1/course/:id',(req,res)=>{
    if(req.params.u1!=active[0] || active.length==0)
    res.status(400).send("User not logged in");
    else
    {
    var cid=req.params.id;
    var uid=req.params.u1;
    var status;var numbers;
    var today = new Date();         
    var start=sub[cid].Start_date;
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
    res.render("details.pug",{cid:cid,status:status,signal:signal,uid:uid});}
})

app.post("/:u1/success",(req,res)=>{
    if(req.params.u1!=active[0] || active.length==0)
    res.status(400).send("User not logged in");
    else
    {
    uid=req.body.uid;
    cid=req.body.cid;
    if(users[uid].subjects.includes(cid))  //includes check if the element is present in the array or not.
    res.render("Enrolled_N",{uid:uid});
    else
    {
        users[uid].subjects.push(cid);
        sub[cid].studs.push(uid);
        res.render("Enrolled_P",{name:sub[cid].name,id:cid});
    }
}
})