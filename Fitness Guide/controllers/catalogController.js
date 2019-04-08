var express = require('express');
var router = express.Router();
var itemDb = require('../utility/itemDB.js');

 router.get('/',  function(req, res) { 
    Promise.all([itemDb.getItems(),itemDb.getCategories()]).then((values)=>
    {
      var data= {
         title:'Categories',
         }
         var items = values[0];
         console.log();
         res.render('categories', {data:data, items : items, category : values[1]});
    });
      // var cb = function(items){
      //    var data= {
      //       title:'Categories',
      //       }
      //       res.render('categories', {data:data, items : items, category : category});
      // }
      // itemDb.getItems(cb);    //array of objects
      // var category = itemDb.category;
   });

 router.get('/item',  function(req, res) { 
   var cb = function(items){
      var data= {
         title:'Categories',
         }
         res.render('categories', {data:data, items : items, category : category});
   }
   itemDb.getItems(cb);    //array of objects
   var category = itemDb.category;
});

 router.get('/item/:itemCode', function(req, res) {
    var itemCode = req.params.itemCode; 
    
    itemDb.getItem(itemCode).then((item)=>{
      if(item)
         {
            res.render('item', { data: item});
         }
         else
         {
            res.redirect('/categories');
         }
    }
    );
    
});

router.get('/*', function (req, res) {
   var data= {
       title:'404 Error',
       error: 'Page not found',
       message: 'Requested URL is not found!'
     }
     res.render('error', {data: data});
});

module.exports=router;