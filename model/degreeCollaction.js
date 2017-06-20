var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var degreeCollection = new Schema({
    // oId: "ObjectId",
    star: Number,
    level: Number,
    plus: Number,
    parameter: {
        type: Schema.Types.ObjectId,
        ref: 'parameter'
    }
});

module.exports = mongoose.model('degree', degreeCollection);