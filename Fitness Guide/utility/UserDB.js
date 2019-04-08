var User = require('../models/User');

global.mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Fitness');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("We are connected to MongoDB!");
});
var schema = mongoose.Schema;
var userSchema = new schema({
    userID : Number, 
    password : String,
    firstName :  String,
    lastName : String,
    email : String,
    address1 : String,
    address2 : String,
    city : String,
    state : String,
    zipcode : String,
    country : String
});
userObject = mongoose.model('User',userSchema);

module.exports.getUsers = function (cb) {  
    function findUsers()
    {
         return new Promise((resolve, reject)=>
         {
             userObject.find().then((data)=>
             {
                let users = [];
                for (let i = 0; i < data.length; i++) {
                    let user = new User(
                            data[i].userID,
                            data[i].password,
                            data[i].firstName,
                            data[i].lastName,
                            data[i].email,
                            data[i].address1,
                            data[i].address2,
                            data[i].city,
                            data[i].state,
                            data[i].zipcode,
                            data[i].country
                        );
                    users.push(user);
                }
                resolve(users);
             });
         });
    }  
    findUsers().then((fromDb)=>cb(fromDb)).catch((err)=>console.log(err));
    
};

module.exports.getUser = function (userID) {
   
        return new Promise((resolve,reject)=>{
            userObject.findOne({userID : userID}).then((data)=>
            {                    
               
                        let user = new User(
                            data.userID,
                            data.password,
                            data.firstName,
                            data.lastName,
                            data.email,
                            data.address1,
                            data.address2,
                            data.city,
                            data.state,
                            data.zipcode,
                            data.country
                        );
                        resolve(user);
                
            });
        });
   
    
    
};

// module.exports.getUser = function (userID,cb) {
//     function findUser()
//     {
//         return new Promise((resolve,reject)=>{
//             userObject.find().then((data)=>
//             {
               
//                 for (var i = 0; i < data.length; i++) {
                
//                     if (parseInt(data[i].userID) == userID) {
                        
//                         let user = new User(
//                             data[i].userID,
//                             data[i].password,
//                             data[i].firstName,
//                             data[i].lastName,
//                             data[i].email,
//                             data[i].address1,
//                             data[i].address2,
//                             data[i].city,
//                             data[i].state,
//                             data[i].zipcode,
//                             data[i].country
//                         );
                        
//                         resolve(user);
//                     }
//                 }
//             });
//         });
//     };
    
//     findUser().then((fromDb)=>{
//         cb(fromDb);
//     }).catch(err=>console.log(err));
// };
// var data = [
//     {
//         userID: 1,
//         firstName: "Sri",
//         lastName: "Ram",
//         email: "sramac@uncc.edu",
//         address1: '9505 Univerisity Terrace Dr',
//         address2: 'Apt A',
//         city: 'Charlotte',
//         state: 'North Carolina',
//         zipcode: '28262',
//         country: 'United States',
//     },
//     {
//         userID: 2,
//         firstName: "Anu",
//         lastName: "Charles",
//         email: "acharles@uncc.edu",
//         address1: '9505 Univerisity Terrace Dr',
//         address2: 'Apt C',
//         city: 'Charlotte',
//         state: 'North Carolina',
//         zipcode: '28263',
//         country: 'United States',
//     }
// ];