var Item = require('../models/item.js');
global.mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Fitness');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log("We are connected to MongoDB!");
});
var schema = mongoose.Schema;
var ItemSchema = new schema({
    itemCode : Number, 
    itemName :  String,
    catalogCategory : String,
    description : String,
    rating : Number
});
ItemObject = mongoose.model('Item',ItemSchema,'items');

var categorySchema = new schema({
    title : String
});
CategoryObject = mongoose.model('Category',categorySchema,'categorys');
//Using Promises
module.exports.getItems = function () {

    // function findItems()
    // {
        return new Promise((resolve,reject)=>{
            ItemObject.find().then((data)=>
                {
                    
                    var fromDb = [];
            
                    for (let i = 0; i < data.length; i++) 
                    {
                        let item = new Item(data[i].itemCode,
                                data[i].itemName,
                                data[i].catalogCategory,
                                data[i].description,
                                data[i].rating,
                                getImageURL(data[i].itemCode),
                                data[i].userID
                                );
                        fromDb.push(item);
                    } 
                    
                        resolve(fromDb);
                    
                }    
                );
                
        });
    // }
    // findItems().then((fromDb)=>cb(fromDb)).catch(err=>console.log(err));
    
};

module.exports.getCategories = function () {
        return new Promise((resolve,reject)=>{
            CategoryObject.find().then((data)=>
                {
                    var fromDb = [];
            
                    for (let i = 0; i < data.length; i++) 
                    {
                        fromDb.push(data[i].title);
                    } 
                        resolve(fromDb);
                    
                }    
                );
                
        });
    // }
    // findItems().then((fromDb)=>cb(fromDb)).catch(err=>console.log(err));
    
};
   
   

function getImageURL(itemCode){
    return "/assets/images/" + itemCode + ".png";
};

module.exports.getItem = function (itemCode) {
    
    return new Promise((resolve,reject)=>{
        ItemObject.findOne({itemCode:itemCode}).then((data)=>
        {                    
                    let item = new Item(data.itemCode,
                        data.itemName,
                        data.catalogCategory,
                        data.description,
                        data.rating,
                        getImageURL(data.itemCode),
                        data.userID
                        );
                    resolve(item);
        });
    });



};




//Array of Strings
module.exports.category = ["NUTRITION", "WORKOUT"];

