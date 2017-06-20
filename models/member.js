var mongoose = require('mongoose');

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
    newMember.save(callback);
}