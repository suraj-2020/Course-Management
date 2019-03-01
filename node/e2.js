var express = require('express');
var Joi = require('joi')
var app = express();
app.use(express.urlencoded({extended :true})); 
app.use(express.json());
const createUserSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(30).required(),
    mail: Joi.string().email()
});

function val(req,res,next){
    createUserSchema.validate(req.body, {abortEarly: false}) //abortEarly - collect all errors not just the first one
            .then(validatedUser => {
                res.status(200).send(`user ${JSON.stringify(validatedUser)} created`);
            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });
}

app.get('/e2',(req,res)=>{
    console.log(req.body());
})