var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nare_blog');

var db = mongoose.connection;

//== Post SChema
var PostSchema = mongoose.Schema({
    title: {
        type: String
    },
    category: {
        type: String
    },
    body: {
        type: String
    },
    date: {
        type: String
    },
    mainimage: {
        type: String
    }

});

var Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.createPost = function(newPost, callback) {
    newPost.save(callback);
}

