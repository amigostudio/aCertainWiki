var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var effectCollection = new Schema({
    // oId: "ObjectId",
    TYPE: "String",
    VALUE: "Double",
    TARGET: "String",
    TARGET_AMOUNT: "Integer",
    DURATION: "Double",
    TIMES: "Integer"
});

module.exports = mongoose.model('EFFECT', effectCollection);