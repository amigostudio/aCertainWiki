var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parameterCollection = new Schema({
    // oId: "ObjectId",
    HP: Number,
    ATK: Number,
    DEF: Number,
    AGL: Number,
    CRI: Number,
    OVR: Number
});

module.exports = mongoose.model('PARAMETER', parameterCollection);