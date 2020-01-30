var users = [];
//var user_count = 0;
var fs = require("fs");


function loadUsers(){
  console.log("\n *STARTING READING USERS* \n");
  // Get content from file
  var contents = fs.readFileSync("users/users.json");
  // Define to JSON type
  var jsonContent = JSON.parse(contents);
  //console.log(jsonContent);
  // Get Value from JSON
  for (x in jsonContent){
    //console.log(jsonContent[x].user_user);
    users.push(new User(jsonContent[x].user_name, jsonContent[x].user_lastname, jsonContent[x].user_user, jsonContent[x].user_password ));
  }
  console.log("\n *DONE READING USERS* \n");
}

function checkUser(a_user, a_pass){
  //console.log("in checkUser");
  for(var i=0; i<users.length; i++){
    //console.log(users[i]);
    if (users[i].user_user == a_user &&  users[i].user_password == a_pass){
      return true;
    }
  }
   return false;
}

function User(name, lastname, user, password){
    this.user_name = name;
    this.user_lastname = lastname;
    this.user_user = user;
    this.user_password =password;
}

module.exports.loadUsers = loadUsers;
module.exports.checkUser = checkUser;
