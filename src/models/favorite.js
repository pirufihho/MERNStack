const mongoose = require('mongoose');

const {Schema} = mongoose;

const FavoriteSchema = new Schema({
    userId: {type: String, required: true},
    cabaniaId: {type: String, required: true},
})

module.exports = mongoose.model('Favorite',FavoriteSchema);