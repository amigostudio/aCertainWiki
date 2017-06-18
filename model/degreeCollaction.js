var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var degreeCollection = new Schema({
    // oId: "ObjectId",
    STAR: "Integer",
    LEVEL: "Integer",
    PLUS: "Integer",
    PARAMETER: "ObjectId"
});

module.exports = mongoose.model('DEGREE', degreeCollection);