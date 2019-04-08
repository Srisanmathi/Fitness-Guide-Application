var UserProfile = require('../models/UserProfile');
var ItemDB = require('../utility/itemDB');
var UserItem = require('../models/UserItem');
global.mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Fitness');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("We are connected to MongoDB!");
});

var schema = mongoose.Schema;
var userProfileSchema = new schema({
    userID : String, 
    itemCode : Number, 
    itemName :  String,
    catalogCategory : String,
    rating : Number,
    readIt : String,
    
});
userProfileObject = mongoose.model('Userprofile',userProfileSchema,'userprofiles');


module.exports.getUserprofile = function (userId) {

        return new Promise((resolve,reject)=>{
            userProfileObject.find({userID : userId}).then((data)=>
                {
                    resolve(data);
                }   
                );
                
        });
    
};

module.exports.getUserItem = function (userId, itemCode) {

    return new Promise((resolve,reject)=>{
        userProfileObject.findOne({userID : userId,itemCode : itemCode}).then((data)=>
            {
                resolve(data);
            }   
            );
            
    });

};

module.exports.saveToUserprofile = function (userId,itemCode) {

    return new Promise((resolve,reject)=>{
        ItemDB.getItem(itemCode).then((item)=>
      {
        var data = {
            userID : userId, 
            itemCode : itemCode, 
            itemName :  item.itemName,
            catalogCategory :item.catalogCategory,
            rating : 0,
            readIt : 'false',
        };
        userProfileObject.find({userID : userId, itemCode : itemCode}).then((result)=>
        {
            if(result.length==0)
            {
                userProfileObject.insertMany([data]).then(()=>{
                    resolve();
                });
            }
            else
            {
                reject();
            }
        }
        );
        

      });

    });

};

module.exports.addItemRating = function (itemCode, userId, rating) {

    return new Promise((resolve,reject)=>{
        userProfileObject.updateOne({userID : userId, itemCode : itemCode},{rating:rating}).then(()=>
        {
            resolve();
    });

});
};

module.exports.addFollowedIt = function (itemCode, userId, readIt) {

    return new Promise((resolve,reject)=>{
        userProfileObject.updateOne({userID : userId, itemCode : itemCode},{readIt:readIt}).then(()=>
        {
            resolve();
    });

});
};

module.exports.deleteFromUserprofile = function (userId,itemCode) {

    return new Promise((resolve,reject)=>{
        userProfileObject.deleteOne({userID : userId, itemCode : itemCode}).then(()=>resolve());
    });
};


   
    



