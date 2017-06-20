var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var effectCollection = new Schema({
    // oId: "ObjectId",
    type: String,
    value: Number,
    target: String,
    targetAmount: Number,
    duration: Number,
    times: Number
});

module.exports = mongoose.model('effect', effectCollection);