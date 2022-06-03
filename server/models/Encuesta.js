const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const encuestaSchema = new Schema({
    document: {
        type: String,
        required: [true, 'Campo requerido'],
    },
    rol: {
        type: String,
        required: [true, 'Campo requerido'],
    },
    gender: {
        type: String,
        required: [true, 'Campo requerido'],
    },
    hadCovid: {
        type: Boolean,
        required: [true, 'Campo requerido'],
    },
    sintomas: {
        type: Array,
        required: [true, 'Campo requerido'],
    },
    durationCovid: {
        type: Number,
        required: [true, 'Campo requerido'],
    },
    timesHimCovid: {
        type: Number,
        required: [true, 'Campo requerido'],
    },
    numberOfDosis: {
        type: Number,
        required: [true, 'Campo requerido'],
    },
    postCovdiEffect: {
        type: Boolean,
        required: [true, 'Campo requerido'],
    }
})

// Create model for encuesta
const Encuesta = mongoose.model('encuesta', encuestaSchema);

module.exports = Encuesta;