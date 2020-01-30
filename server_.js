
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
//console.log(users.checkUser("user0", "aaaa"))
//app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/public/*',function(req, res) {
  console.log("####");
  res.write("Incorrect path");
  res.end();
});

app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("view options", {layout: false});


//app.use(location, express.static(__dirname + location));
app.get('/',function(req, res) {
  console.log(__dirname + location + '/index.html');
  res.sendFile(__dirname + location + '/index.html');
});

app.get('*',function(req, res) {
  console.log(__dirname + location + '/index.html');
  res.sendFile(__dirname + location + '/index.html');
});

app.all('public/*', function (req, res, next) {
  console.log("******");
   //will hit every page request regardless of http method
    next(); // pass control to the next handler
});
app.post('/',function(req, res) {
  console.log(req.body);
  console.log(req.body[0].value);
  console.log(req.body[1].value);
  if (users.checkUser(req.body[0].value, req.body[1].value)){
    console.log("good user");
    res.json({success:true});
  }
  else{
    console.log("bad user");
    res.json({success:false});
  }

});

app.get('public/ics2o',function(req, res) {
    console.log("ics2o.html");
    res.writeHead(404);
    res.write("File not Found!");
    res.end();
  });

app.get('/ics2o',function(req, res) {
    console.log("ics2o");
    fs.readFile(__dirname + location + '/ICS2O.html', 'utf8', (err, text) => {
      if(err){
        res.writeHead(404);
        res.write("File not Found!");
        res.end();
      }
      else{
        res.sendFile(__dirname + location + '/ICS2O.html');
      }
    });
  /*res.writeHead(200, {'Content-Type':'text/html'});
  fs.readFile(__dirname + location + '/ICS2O.html', 'utf8', function(error, data){
    if(error){
      res.writeHead(404);
      res.write("File not Found!");
    }
    else{
      res.write(data);
    }
    res.end();
  } );*/


  //console.log(__dirname + location + '/ICS2O.html');
  //res.sendFile(__dirname + location + '/ICS2O.html');

  /*fs.readFile(__dirname + location + '/ICS2O.html', function (err, html) {
    if (err) {
        console.log("error reading file");
    }
    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write(html);
    res.end();
  });(/)

  /*console.log(req.body[0].value);
  console.log(req.body[1].value);
  if (users.checkUser(req.body[0].value, req.body[1].value)){
    console.log("good user");
    res.json({success:true});
  }
  else{
    console.log("bad user");
    res.json({success:false});
  }*/

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
