var express = require('express');
var router = express.Router();


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



module.exports = router;