const mongoose = require('mongoose');

const contactShema = mongoose.Schema({
    name :{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('Contact', contactShema)