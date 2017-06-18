var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var degreeCollection = new Schema({
    // oId: "ObjectId",
    STAR: Number,
    LEVEL: Number,
    PLUS: Number,
    PARAMETER: Schema.Types.ObjectId
});

module.exports = mongoose.model('DEGREE', degreeCollection);