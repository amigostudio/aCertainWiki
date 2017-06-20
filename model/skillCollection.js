var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var skillCollection = new Schema({
    // oId: "ObjectId",
    attack: Number,
    // Array of {effect}
    heavy: [{
        type: Schema.Types.ObjectId,
        ref: 'effect'
    }],
    // Array of {effect}
    slide: [{
        type: Schema.Types.ObjectId,
        ref: 'effect'
    }],
    // Array of {effect}
    drive: [{
        type: Schema.Types.ObjectId,
        ref: 'effect'
    }]
});

module.exports = mongoose.model('skill', skillCollection);