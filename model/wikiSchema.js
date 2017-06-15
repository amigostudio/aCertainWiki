var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var systemPropertyCollection = require("./systemPropertyCollection");

// function WikiSchema() {
exports.wikiSchema = mongoose.model('SYSTEM_PROPERTY', systemPropertyCollection);
// }

// module.exports = WikiSchema;