var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeguidorSchema = new Schema({
    username: { type: String, required: true },
    seguidor: { type: String, required: true }
});

module.exports = mongoose.model('Seguidore',SeguidorSchema);