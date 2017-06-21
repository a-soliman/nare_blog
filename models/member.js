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
    }
});

var Member = module.exports = mongoose.model('Member', MemberSchema);

module.exports.createMember = function(newMember, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newMember.password, salt, function(err, hash) {
            // Store hash in your password DB. 
            newMember.password = hash;
            newMember.save(callback);
        });
    });
}