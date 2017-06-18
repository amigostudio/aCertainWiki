var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parameterCollection = new Schema({
    // oId: "ObjectId",
    HP: "Integer",
    ATK: "Integer",
    DEF: "Integer",
    AGL: "Integer",
    CRI: "Integer",
    OVR: "Integer"
});

module.exports = mongoose.model('PARAMETER', parameterCollection);