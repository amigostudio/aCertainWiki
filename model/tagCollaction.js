var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tagCollection = new Schema({
    // oId: "ObjectId",
    TAG: "String"
});

module.exports = mongoose.model('TAG', tagCollection);