const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        index: true,
        validate: [function(name){
            return name.length >= 3;
        }, 'El "Nombre" debe tener tres (3) o más caracteres.']
    },
    email: {
        type: String,
        index: {unique: true},
        validate: [function(email){
            return !(!email.match(/.+\@.+\..+/));
        }, 'El "Email" es incorrecto.']
    },
    // img: {
        // type: String
    // },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(uniqueValidator, { message: 'Lo sentimos, el {PATH} ({VALUE}) ya existe. Prueba con otro?' });
UserSchema.plugin(deepPopulate);

module.exports = mongoose.model('User', UserSchema);