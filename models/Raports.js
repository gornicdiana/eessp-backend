const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaportSchema = new Schema({
    flag: {
        type: Boolean,
        required: true
    },
    doctorNumber: {
        type: String,
        required: true
    },
    doctorFirstname: {
        type: String,
        required: true
    },
    dorctorLastname: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    cnp: {
        type: String,
        require: true
    },
    serieNr: {
        type: String,
        require: false
    },
    varsta: {
        type: Number,
        require: true
    },
    sex: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: false
    },
    alergic: {
        type: String,
        require: false
    },
    grup: {
        type: String,
        require: false
    },
    rh: {
        type: String,
        require: false
    },
    diagInt: {
        type: String,
        require: true
    },
    diag72: {
        type: String,
        require: false
    },
    diagPr: {
        type: String,
        require: true
    },
    tehnica: {
        type: String,
        require: false
    },
    boalaInt: {
        type: String,
        require: false
    },
    dataInt: {
        type: Date,
        require: true
    },
    dataInterventie: {
        type: Date,
        require: true
    },
    dataExt: {
        type: Date,
        require: false
    },
    stareExt: {
        type: String,
        require: true
    },
    transfer: {
        type: String,
        require: false
    },
    diagDeces: {
        type: String,
        require: false
    },
    varstaTata: {
        type: Number,
        require: false
    },
    varstaMama: {
        type: Number,
        require: false
    },
    alteAfectiuni: {
        type: String,
        require: false
    },
    evolutieSarcina: {
        type: String,
        require: false
    },
    nrControale: {
        type: Number,
        require: false
    },
    nrCopii: {
        type: Number,
        require: false
    },
    nrLuni: {
        type: Number,
        require: false
    },
    greutateCopil: {
        type: Number,
        require: false
    },
    lungime: {
        type: Number,
        require: false
    },
    nastere: {
        type: String,
        require: false
    },
    dataNastere: {
        type: Date,
        require: false
    },
    istoric: {
        type: String,
        require: false
    },
    temp: {
        type: Number,
        require: true
    },
    greutate: {
        type: Number,
        require: true
    },
    rezInter: {
        type: String,
        require: false
    },
    starePrez: {
        type: String,
        require: true
    },
    prescriptie: {
        type: String,
        require: true
    },
    evolutie: {
        type: String,
        require: false
    },
    boliConcomitente: {
        type: String,
        required: false
    },
    diagTrimitere: {
        type: String,
        required: false
    },
    dataInterventie: {
        type: Date,
        required: false
    }
});

module.exports = Raport = mongoose.model("raports", RaportSchema);
