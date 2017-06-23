var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nare_blog');

var db = mongoose.connection;

var Post = require('../models/post');

/* GET home page. */
router.get('/',ensureAuthenticated , function(req, res, next) {

  var posts = Post

   posts.find({}, {}, function(err, posts) {
     res.render('index', { title: 'Home', posts: posts });
   })
  
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/members/login');
}

module.exports = router;
