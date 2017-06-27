var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nare_blog');

var db = mongoose.connection;

var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {

  var posts = Post

   posts.find({}, {}, function(err, posts) {
     res.render('index', { title: 'Posts', posts: posts });
   })
  
});


module.exports = router;
