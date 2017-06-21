var express = require('express');
var router = express.Router();

var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var Member = require('../models/member');


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

// === using Passport to login

router.post('/login',
  passport.authenticate('local', {failurRedirect: '/users/login', failurFlash: 'Invalid username or password'}),
  function(req, res) {
    
    req.flash('success', 'You are now logged in');
    res.redirect('/');

    res.redirect('/users/' + req.user.username);
  });

// == passport Serialize
passport.serializeUser(function(member, done) {
  done(null, member.id);
});

passport.deserializeUser(function(id, done) {
  Member.getMemberById(id, function(err, member) {
    done(err, member);
  });
});

 // local stratigy 
passport.use(new localStrategy(function(username, password, done) {
  Member.getMemberByUsername(username, function(err, member) {
    if(err) throw err;
    if(!member) {
      return done(null, false, {message: 'Unknown User'});
    }

    Member.comparePassword(password, member.password, function(err, isMatch) {
      if(err) return done(err);

      if(isMatch) {
        return done(null, member);
      } else {
        return done(null, flase, {message: 'Invalid Password'});
      }

    })
  })
}));



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
    var newMember = new Member({
      name: name,
      email: email,
      username: username,
      password: password
    });

    Member.createMember(newMember, function(err, member) {
      if(err) throw err;
      console.log(member)
    });

    req.flash('success', 'You are now registed and can Login!')

    res.location('/');
    res.redirect('/')
  }
});

module.exports = router;
