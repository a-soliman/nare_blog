var express = require('express');
var router = express.Router();


/* GET Members listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{title: 'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login',{title: 'Login'});
});

// == handeling the Register form post request
router.post('/register', function(req, res, next) {
  // = get the data
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // = validate
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  
  var errors = req.validationErrors();

  if(errors) {
    res.render('register', {
      errors: errors
    })
  } else {
    console.log('Good To Go')
  }
});

module.exports = router;
