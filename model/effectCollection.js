var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var effectCollection = new Schema({
    // oId: "ObjectId",
    TYPE: String,
    VALUE: Number,
    TARGET: String,
    TARGET_AMOUNT: Number,
    DURATION: Number,
    TIMES: Number
});

module.exports = mongoose.model('EFFECT', effectCollection);