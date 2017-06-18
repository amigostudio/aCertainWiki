var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var skillsCollection = new Schema({
    // oId: "ObjectId",
    ATTACK: Number,
    HEAVY: [Schema.Types.ObjectId], // Array of {effect}
    SLIDE: [Schema.Types.ObjectId], // Array of {effect}
    DRIVE: [Schema.Types.ObjectId]  // Array of {effect}
});

module.exports = mongoose.model('SKILLS', skillsCollection);