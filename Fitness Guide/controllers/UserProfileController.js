var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserDB = require('../utility/UserDB');
var ItemDB = require('../utility/itemDB');
var UserItemDB = require('../utility/UserItemDB');
var UserItem = require('../models/UserItem');
var UserProfile = require('../models/UserProfile');

var urlEncodedParser = bodyParser.urlencoded({extended: false}); 

router.get('/',  function(req, res) { 
    
    var data= {
      title:'Home',
    }
    res.render('index', {data:data});
 });  

 router.get('/login', function (req, res) {
    if(req.session.theUser === undefined)
    {
        UserDB.getUser(1).then((data)=>{
        req.session.theUser = data;
        isLogin = true;
        res.redirect('/user/myItems');
        });
        
      }
      
 });
  
    router.get('/myItems', function (req, res) {

    if(req.session.theUser === undefined){
     
      res.redirect('/');
    }
    else{
     
      UserItemDB.getUserprofile(req.session.theUser.userID).then((data)=>
      {
        res.render('myitems', { data: data });
      })
     
  }});

  router.post('/:action/:itemCode',urlEncodedParser, function(req, res){
    action = req.params.action;
    //If action is "save"
    if(action == "save")
    {
      if(req.body.itemCode == req.body.itemList)
    {
      var itemCode = req.params.itemCode;
      UserItemDB.saveToUserprofile(req.session.theUser.userID,itemCode).then((data)=>
      {
        res.redirect('/user/myitems');
      }).catch(()=>{
        console.log("Item is already saved!");
        res.redirect('/user/myitems');
      })
      
      //userProfile.addItem(userItem);
      //req.session.userProfile = userProfile.getItems();
     
    }
    else{
      console.log("Wrong Id");
      res.redirect('/user/myitems');
    }
    }
    //If action is delete
    else if(action == "delete")
    {
    var itemCode = req.params.itemCode;
    UserItemDB.deleteFromUserprofile(req.session.theUser.userID,itemCode).then(()=>
    {
      res.redirect('/user/myitems');
    })
    // userProfile.removeItem(itemCode);
    // req.session.userProfile = userProfile.getItems();
    // res.redirect('/user/myitems');
    }
    else if(action == "update")
    {
      console.log("update");
    var isPresent = false;
    for(var i=0;i<req.body.itemList.length;i++)
    {
      if(req.body.itemList[i]==req.body.itemCode)
      {
        isPresent = true;
        break;
      }
    }    
    if(isPresent)
    {
        var itemCode = req.params.itemCode;
        Promise.all([ItemDB.getItem(itemCode),UserItemDB.getUserItem(req.session.theUser.userID, itemCode)]).then((values)=>
        {
            var item = values[0];
            var feed = values[1];

            var data= {
              title:'Feedback',
            }
             //console.log("feed.rating");
            if(feed.rating!=null)
               res.render('feedback', { data: data , item: item, userItem:feed});
            else
               res.redirect('/');   
        }       
              
            );
      }
    else{
      console.log('Item Not found in your Saved Items List!');
      res.redirect('/user/myitems');
    }
    }
    else if(action=="updateRating")
    {
      var itemCode = req.params.itemCode;
  //var userProfileItem = userProfile.getUserItem(itemCode);
  // if(userProfileItem === undefined){
  //     console.log('Item Not found in your Saved Items List!');
  //     res.redirect('/user/myitems');
  // }else{
      var rating = req.body.rate;
      UserItemDB.addItemRating(itemCode,req.session.theUser.userID,rating).then(()=>
      {
        res.redirect('/user/myitems');
      })
     // var followedIt = req.body.readit;
      // var item = userProfileItem.item;
      // var userItem = new UserItem(item, rating, followedIt);
      // userProfile.updateItem(userItem);
      // req.session.userProfile = userProfile.getItems();
      
  }
  else if(action=="updateFlag")
    {
      var itemCode = req.params.itemCode;
  //var userProfileItem = userProfile.getUserItem(itemCode);
  // if(userProfileItem === undefined){
  //     console.log('Item Not found in your Saved Items List!');
  //     res.redirect('/user/myitems');
  // }else{
      var followedIt = req.body.readit;
      UserItemDB.addFollowedIt(itemCode,req.session.theUser.userID,followedIt).then(()=>
      {
        res.redirect('/user/myitems');
      })
     // var followedIt = req.body.readit;
      // var item = userProfileItem.item;
      // var userItem = new UserItem(item, rating, followedIt);
      // userProfile.updateItem(userItem);
      // req.session.userProfile = userProfile.getItems();
      
  };
    });
   


 router.get('/logout',  function (req, res) {
  req.session.theUser = undefined;
  //userProfile.emptyProfile();
  //req.session.userProfile = userProfile.getItems();
  res.redirect('/');
});

module.exports=router;