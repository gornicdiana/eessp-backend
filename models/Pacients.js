const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PacientSchema = new Schema({
    cnp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
    dateOut: {
        type: Date,
        required: false
    }
})

module.exports = Pacient = mongoose.model('pacients', PacientSchema)
