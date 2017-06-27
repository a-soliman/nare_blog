var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nare_blog');

var db = mongoose.connection;

var Post = require('../models/post');
var Category = require('../models/category');

/* GET postes view page. */
router.get('/', function(req, res, next) {

  var posts = Post

   posts.find({}, {}, function(err, posts) {
     res.render('index', { title: 'Posts', posts: posts });
   });
  
});

// Show by category
router.get('/show/:category', function(req, res, next) {
    var posts = Post;
    var categories = Category;
    
    posts.find({category: req.params.category}, {}, function(err, posts) {
        res.render('index', {title: 'Posts', posts: posts})
    });
});

// Show Single post
router.get('/post/:id', function(req, res, next) {
    var posts = Post;
    var categories = Category;
    
    posts.findById(req.params.id, function(err, post) {
        res.render('show', {title: 'Posts', post: post})
    });
    
});

module.exports = router;
