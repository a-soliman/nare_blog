var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nare_blog');

var db = mongoose.connection;

//== Member SChema
var MemberSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    isAdmin: {
        type: Boolean
    }
});

var Member = module.exports = mongoose.model('Member', MemberSchema);

module.exports.getMemberById = function(id, callback) {
    Member.findById(id, callback);
}

module.exports.getMemberByUsername = function(username, callback) {
    var query = {username: username};
    Member.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    // Load hash from your password DB. 
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        callback(null, isMatch); 
    });
}

module.exports.createMember = function(newMember, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newMember.password, salt, function(err, hash) {
            // Store hash in your password DB. 
            newMember.password = hash;
            newMember.save(callback);
        });
    });
}