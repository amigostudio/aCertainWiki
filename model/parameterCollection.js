var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var parameterSchema = new Schema({
    // oId: "ObjectId",
    HP: Number,
    ATK: Number,
    DEF: Number,
    AGL: Number,
    CRI: Number,
    OVR: Number
});

var parameterCollection = mongoose.model('PARAMETER', parameterSchema);

module.exports = parameterCollection;

module.exports.insertParameter = function(oParam) {
    parameterCollection.create({
        HP: oParam.HP,
        ATK: oParam.ATK,
        DEF: oParam.DEF,
        AGL: oParam.AGL,
        CRI: oParam.CRI,
        OVR: oParam.OVR
    }, function(err, docs) {
        debugger;
        var oId = docs.id;
    });
}
