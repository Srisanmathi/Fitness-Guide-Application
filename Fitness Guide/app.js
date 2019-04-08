var express = require('express');
var app = express();
var session = require('express-session');

var IndexController = require('./controllers/IndexController.js');
 var categoryController = require('./controllers/catalogController.js');
 var userProfileController = require('./controllers/UserProfileController.js');

app.set('view engine','ejs');

app.use(session({
    secret: 'happy',
    name: 'assignment3',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use('/assets', express.static('assets'));

app.use(function(req, res, next){
    if(req.session.theUser === undefined){
        global.isLogin = false;
    }else{
        global.isLogin = true;
        global.theCurrentUser = req.session.theUser;
    }
    next();
});

app.use('/',IndexController);
 app.use('/categories',categoryController);
 app.use('/user', userProfileController);

app.get('/*', function (req, res) {
    var data= {
        title:'404 Error',
        error: 'Page not found',
        message: 'Requested URL is not found!'
      }
      res.render('error', {data: data});
});

app.listen(8080,function()
{
    console.log("Server listening at port 8080");
});