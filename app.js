const express = require('express')
const routes = require('./routes/router')
const handlebars = require('express-handlebars');
const path = require('path')
const dateFormat = require("dateformat")



const app = express()
const PORT = 3000;

const hbs = handlebars.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs',hbs.engine) 
app.set('view engine','hbs')
app.set('views','views')
app.use(express.json({ extended: true }))
app.use("/public",express.static(path.join(__dirname,'/public')))
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({ extended: true }))
app.use(routes)



function logger(req, res, next) {
    var go = dateFormat(Date.now(), "HH:MM:ss")
    console.log(`${go} >> IP: ${req.ip}\n URL: ${req.url}`);
    next(); 
  }

app.use(logger)

async function Start(){
    try {
        app.listen(3000,()=>{ 
            var go = dateFormat(Date.now(), "HH:MM:ss")
            console.log(`${go} >> Server started on port: ${PORT}`)            
        })        
    } catch (error) {
        console.log(error)
    }
}

Start();