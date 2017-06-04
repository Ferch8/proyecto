var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PublicacionSchema = new Schema({
    username: { type: String, lowercase: true, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    fav: { type: Number, default: 0 }
});

module.exports = mongoose.model('Publicacione',PublicacionSchema);