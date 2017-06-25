var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'uploads'});

var Post = require('../models/post');

//rendering the admin page 
router.get('/', function(req, res, next) {
    res.render('admin', {status: 'Admin'});
})

router.get('/addPost', function(req, res, next) {
    res.render('addPost', {status: 'Admin'});
})

router.get('/editPosts', function(req, res, next) {
    res.render('editPosts', {status: 'Admin'});
})

router.get('/addCategory', function(req, res, next) {
    res.render('addCategory', {status: 'Admin'});
})

router.get('/editCategories', function(req, res, next) {
    res.render('editCategories', {status: 'Admin'});
})

// == post request to add to the posts in the database
router.post('/add_post', upload.single('mainimage'), function(req, res, next) {
    //get the form values
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var date = new Date();
    
    if(req.file) {
        var mainimage = req.file.filename;
    } else {
        var mainimage = 'noimage.jpg'
    }

    //form validation
    req.checkBody('title', ' Title field is required.').notEmpty();
    req.checkBody('body', ' Body field is required.').notEmpty();

    //check errors
    var errors = req.validationErrors();

    if(errors) {
        res.render('addPost', {
            status: 'Admin',
            errors: errors
        });
    } else {
        var newPost = new Post({
            title: title,
            body: body,
            category: category,
            date: date,
            mainimage: mainimage
        });

        Post.createPost(newPost, function(err, post) {
            if(err) throw err;
        });

        req.flash('success', 'Post Added.');
        res.location('/admin');
        res.redirect('/admin');
    }
})


module.exports = router;