var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var childCollection = new Schema({
    // oId: "ObjectId",
    NAME: "String",
    ICON: "String",
    INIT_STAR: "Integer",
    CAREER: "Integer",
    // Array of {Degree}    
    DEGREE: "Array", 
    // Array of {Tag}
    TAG: "Array"
});

module.exports = mongoose.model('CHILD', childCollection);