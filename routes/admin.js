var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './public/images'});

var Post = require('../models/post');
var Category = require('../models/category');
var Member = require('../models/member');

//rendering the admin page 
router.get('/', function(req, res, next) {
    res.render('admin', {status: 'Admin'});
})

router.get('/addPost', function(req, res, next) {
    //get categories from db to render them in a select elemnt
    
    var categories = Category;
    
    categories.find({}, {}, function(err, categories) {
        res.render('addPost', {status: 'Admin', categories: categories});
    })
})

router.get('/editPosts', function(req, res, next) {
    var posts = Post;
    posts.find({}, {} , function(err, posts) {
        res.render('editPosts', {status: 'Admin', posts: posts});
    })
})

router.get('/addCategory', function(req, res, next) {
    res.render('addCategory', {status: 'Admin'});
})

router.get('/editCategories', function(req, res, next) {

    var categories = Category;

    categories.find({}, {}, function(err, categories) {
        res.render('editCategories', {status: 'Admin', categories: categories});
    })
    
})

router.get('/manageMembers', function(req, res, next) {

    var members = Member;

    members.find({}, {}, function(err, members) {
        res.render('manageMembers', {status: 'Admin', members: members});
    })
    
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

// == post request to add Category to the database
router.post('/addCategory', function(req, res, next) {
    //get the form values
    var name = req.body.name;

    //form validation
    req.checkBody('name', ' Name field is required.').notEmpty();
    
    //check errors
    var errors = req.validationErrors();

    if(errors) {
        res.render('addCategory', {
            status: 'Admin',
            errors: errors
        });
    } else {
        var newCategory = new Category({
            name: name
        });

        Category.createCategory(newCategory, function(err, category) {
            if(err) throw err;
        });

        req.flash('success', 'Category Added.');
        res.location('/admin');
        res.redirect('/admin');
    }
})


module.exports = router;