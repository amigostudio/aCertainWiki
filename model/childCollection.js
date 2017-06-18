var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var childCollection = new Schema({
    // oId: "ObjectId",
    NAME: String,
    ICON: String,
    INIT_STAR: Number,
    CAREER: Number,
    // Array of {Degree}    
    DEGREE: [Schema.Types.ObjectId], 
    // Array of {Tag}
    TAG: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('CHILD', childCollection);