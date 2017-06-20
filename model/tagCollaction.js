var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tagCollection = new Schema({
    // oId: "ObjectId",
    tag: String
});

module.exports = mongoose.model('tag', tagCollection);