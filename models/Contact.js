const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^0\d{9}$/.test(value);
            },
            message: props => `${props.value} n'est pas un numéro de téléphone valide`
        }
    }
});

module.exports = mongoose.model('Contact', contactSchema);
