const express = require("express");
const appointments = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const appointmentModel = require("../models/Appointment");
appointments.use(cors());

process.env.SECRET_KEY = "secret";
appointments.post("/add", (req, res) => {
    console.log(req.body);

    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    console.log(decoded);

    const appointmentData = {
        student: decoded.email,
        therapist: req.body.therapist,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    };
    console.log(appointmentData);

    appointmentModel.create(appointmentData).then((appointment) => {
        return res.json(appointment);
    }).catch((err) => {
        console.log(err);
        return res.send("error" + err);
    });
});

appointments.get("/therapistCalendar", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    console.log(decoded);

    appointmentModel.find({therapist: decoded.email}).then((appointment) => {
        console.log(appointment);
        res.send(appointment);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

appointments.get("/studentCalendar", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    console.log(decoded);

    appointmentModel.find({student: decoded.email}).then((appointment) => {
        console.log(appointment);

        res.send(appointment);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

module.exports = appointments;
