const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    doctorNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Doctor = mongoose.model("doctors", DoctorSchema);
