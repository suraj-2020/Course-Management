var express = require('express');
var Joi = require('joi')
var app = express();
app.use(express.urlencoded({extended :true})); 
app.use(express.json());
app.set('views','./views');
app.set("view engine","pug");

app.get('/home',(req,res)=>{     //  To Load the page it takes get request
    res.render("home");
})

const createUserSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30).required(),
    mail: Joi.string().email()
});

function val(req,res,next){
    createUserSchema.validate(req.body, {abortEarly: false}) //abortEarly - collect all errors not just the first one
            .then(validatedUser => {
                res.status(200).send(`user ${JSON.stringify(validatedUser)} created`);next();
            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });
}


/*
middleware need not to be in app.use can be in parameters
app.use((req,res,next)=>{ //acts as middleware an always gets executed before get and post request. Use next to go to next function.
    if(req.url == '/'){
    console.log("midleware");}
    next();
})*/
app.use(val);
app.post('/course/:id',(req,res)=>{    //  Form data send as post request.
    console.log(req.params.id);
    res.send("done");
    res.end();
}).listen(3000);
