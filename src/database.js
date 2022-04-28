const mongoose = require('mongoose');

const URI = 'mongodb+srv://pirufihho:pixellated@cluster0.6qx4c.azure.mongodb.net/test'

mongoose.connect(URI).then(db => {
    console.log('db is connected');
}).catch(err => {
    console.log(err);
})

module.exports = mongoose;