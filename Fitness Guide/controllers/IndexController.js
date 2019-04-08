var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var data= {
      title:'Home',
    }
    res.render('index', { data: data });
  });

  router.get('/about', function (req, res) {
    var data= {
      title:'About Fitness Guide',
    }
    res.render('about', { data: data });
  });

  router.get('/contact', function (req, res) {
    var data= {
      title:'Contact Us',
    }
    res.render('contact', { data: data });
  });

  module.exports = router;

