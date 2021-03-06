const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app=express();
const port=process.env.PORT||3000;
hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');



hbs.registerHelper('getYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method}: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){
      console.log(err);
    }
  });
  next();

});
// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

app.get("/",function(request,response){
  // response.send("<h1>Hello</h1>");
  response.render("home.hbs",{
    pageTitle:'Home Page',

    welcomeMessage:'Welcome to my site.'
  })
});
app.get("/about",(req,res)=>{
  res.render("about.hbs",{
    pageTitle:'About Page'
  });
});

app.get("/project",(req,res)=>{
  res.render("project.hbs",{
    pageTitle:'Project Page',
    welcomeMessage:'Here goes portfolio'
  });
});

app.get("/bad.html",(req,res)=>{
  res.send({
    error:"File not found!"
  });
});
app.listen(port);
