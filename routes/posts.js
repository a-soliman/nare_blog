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

// add comment to a post
router.post('/addcomment', function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var body = req.body.body;
    var commentdate = new Date();
    var postid = req.body.postid;

    //form validation
    req.checkBody('body', 'Comment text is required').notEmpty();

    var errors = req.validationErrors();

    if(errors) {
        var posts = Post;
        
        posts.findById(postid, function(err, post) {
            res.render('show', 
            {
                title: 'Posts', 
                post: post, 
                errors: errors})
        });
    } else {
        var comment = {
            "name" : name,
            "email" : email,
            "body": body,
            "commentdate" : commentdate
        }

        var posts = Post;
        posts.update({
            "_id" : postid
        }, {
            $push: {
                "comments" : comment
            }
        },{ 'new': true}, function(err, doc) {
            if(err) {
                throw err;
            } else {
                req.flash('success', 'Comment Added')
                res.location('/posts/post/' + postid);
                res.redirect('/posts/post/' + postid);
            }
        })
    }
})

module.exports = router;
