var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var systemPropertyCollection = new Schema({
    // oId: "ObjectId",
    PROPERTY_NAME: "String",
    VALUE: "String"
});

module.exports = systemPropertyCollection;