const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for users
const UserSchema = new Schema({
    documentType: {
        type: String,
        required: [true, 'El tipo documento es requerido'],
    },
    document: {
        type: String,
        required: [true, 'El documento es requerido'],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, 'El primer nombre es requerido'],
    },
    secondName: { type: String },
    firstLastName: {
        type: String,
        required: [true, 'El primer apellido es requerido'],
    },
    secondLastName: { type: String },
    dateBirth: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida'],
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        unique: true
    },
});

// Create model for users
const User = mongoose.model('user', UserSchema);

module.exports = User;