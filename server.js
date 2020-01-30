
console.log('server running');
// mongo
//let mongojs = require("mongojs");
//let uri = 'mongodb://admin:root123@ds063449.mlab.com:63449/heroku_wtqs46qf';
//let db = mongojs(process.env.MONGODB_URI || uri);

const users = require ('./users')
// express
let location = '/static';
let express = require('express');
let app = express();
let path = require('path');
let serv = require('http').Server(app);
let https = require('https');
let bodyParser = require ('body-parser');
let fs = require('fs');

users.loadUsers();

app.get('/public/ics2o.html',function(req, res) {
  app.use('/public', express.static(path.join(__dirname, 'static')));
  res.sendFile(__dirname + location + '/index.html');
});

app.get('/public/ics3u.html',function(req, res) {
  app.use('/public', express.static(path.join(__dirname, 'static')));
  res.sendFile(__dirname + location + '/index.html');
});

app.get('/public/ics3c.html',function(req, res) {
  app.use('/public', express.static(path.join(__dirname, 'static')));
  res.sendFile(__dirname + location + '/index.html');
});

app.get('/public/ics4u.html',function(req, res) {
  app.use('/public', express.static(path.join(__dirname, 'static')));
  res.sendFile(__dirname + location + '/index.html');
});

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("view options", {layout: false});


//app.use(location, express.static(__dirname + location));
app.get('/',function(req, res) {
  //console.log(__dirname + location + '/index.html');
  res.sendFile(__dirname + location + '/index.html');
});

app.post('/',function(req, res) {
  //console.log(req.body);
  //console.log(req.body[0].value);
  //console.log(req.body[1].value);
  if (users.checkUser(req.body[0].value, req.body[1].value)){
    //console.log("good user");
    res.json({success:true});
  }
  else{
    //console.log("bad user");
    res.json({success:false});
  }

});

app.get('/ics2o',function(req, res) {
    fs.readFile(__dirname + location + '/ICS2O.html', 'utf8', (err, text) => {
      if(err){
        res.writeHead(404);
        res.write("File not Found!");
        res.end();
        console.log("ERROR" + err.code + " ("+ err.message+")");
        return;
      }
      res.sendFile(__dirname + location + '/ICS2O.html');
    });
});

app.get('/ics3u',function(req, res) {
    fs.readFile(__dirname + location + '/ICS3U.html', 'utf8', (err, text) => {
      if(err){
        res.writeHead(404);
        res.write("File not Found!");
        res.end();
        console.log("ERROR" + err.code + " ("+ err.message+")");
        return;
      }
      res.sendFile(__dirname + location + '/ICS3U.html');
    });
});

app.get('/ics3c',function(req, res) {
    fs.readFile(__dirname + location + '/ICS3C.html', 'utf8', (err, text) => {
      if(err){
        res.writeHead(404);
        res.write("File not Found!");
        res.end();
        console.log("ERROR" + err.code + " ("+ err.message+")");
        return;
      }
      res.sendFile(__dirname + location + '/ICS3C.html');
    });
});

app.get('/ics4u',function(req, res) {
    fs.readFile(__dirname + location + '/ICS4U.html', 'utf8', (err, text) => {
      if(err){
        res.writeHead(404);
        res.write("File not Found!");
        res.end();
        console.log("ERROR" + err.code + " ("+ err.message+")");
        return;
      }
      res.sendFile(__dirname + location + '/ICS4U.html');
    });
});

let port = process.env.PORT || 8080;
serv.listen(port);

/*const express = require('express');
const app = express();
app.get('/', (req, res)=>{
  res.sendFile (path.join(__dirname, 'static', 'index.html'));
//  res.sendFile (path.join(__dirname, 'static', 'style.css'));
});
app.listen(8080);*/
