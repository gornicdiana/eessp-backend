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

    const link = '';

    const appointmentData = {
        student: decoded.email,
        therapist: req.body.therapist,
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        category: req.body.category,
        link: link
    };

    appointmentModel.create(appointmentData).then((appointment) => {
        return res.json(appointment);
    }).catch((err) => {
        console.log(err);
        return res.send("error" + err);
    });
});

appointments.get("/therapistCalendar", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);

    appointmentModel.find({therapist: decoded.email}).then((appointment) => {
        res.send(appointment);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

appointments.get("/studentCalendar", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);

    appointmentModel.find({student: decoded.email}).then((appointment) => {

        res.send(appointment);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

appointments.put("/update", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    const link = {
        link: req.body.link
    }
    appointmentModel.updateOne({
        link: decoded.link
    }, link).then((appointment) => {
        console.log(appointment);
        res.send("Link updated!")
    }).catch((err) => {
        res.send("error: " + err);
    });
})

module.exports = appointments;
