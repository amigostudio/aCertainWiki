var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var childCollection = new Schema({
    // oId: "ObjectId",
    name: String,
    icon: String,
    initStar: Number,
    career: Number,
    // Array of {Degree}    
    degree: [{
        type: Schema.Types.ObjectId,
        ref: 'degree'
    }], 
    // Array of {Tag}
    tag: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }]
});

module.exports = mongoose.model('child', childCollection);