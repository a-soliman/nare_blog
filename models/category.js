var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nare_blog');

var db = mongoose.connection;

//== Post SChema
var CategorySchema = mongoose.Schema({
    name: {
        type: String
    }
});

var Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.createCategory = function(newCategory, callback) {
    newCategory.save(callback);
}

