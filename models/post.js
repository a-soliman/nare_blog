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
    }

});

var Post = module.exports = mongoose.model('Post', PostSchema);

