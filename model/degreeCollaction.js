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
    },
    skill: {
        type: [Schema.Types.ObjectId],
        ref: 'skill'
    }
});

module.exports = mongoose.model('degree', degreeCollection);