const express = require('express');
let port = 8080;
const session=require('express-session')
const passport=require('passport');


const fs = require('fs')
const path=require('path')
const flash = require('connect-flash');

const app = express();

app.set('view engine','ejs');

const passportlocal=require('./config/passportlocalstretergy');
const mongoose = require('./config/database');

app.use(session({
    name:'hello',
    secret:'nothing',
    saveUninitialized:true,
    resave:true,
    cookie:{
        maxage:1000*60*60
    }
}))

app.use(express.urlencoded());
app.use(flash())


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/uploads')));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);

app.use((req, res, next) => {
    res.locals.message = req.flash();
    next();
});



app.use('/',require('./routes/indexroutes'));



app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    else{
        console.log("port start "+port);
    }
})