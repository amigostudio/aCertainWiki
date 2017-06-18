var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var skillsCollection = new Schema({
    // oId: "ObjectId",
    ATTACK: "Integer",
    HEAVY: "Array", // Array of {effect}
    SLIDE: "Array", // Array of {effect}
    DRIVE: "Array"  // Array of {effect}
});

module.exports = mongoose.model('SKILLS', skillsCollection);