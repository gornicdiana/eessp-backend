const express = require("express");
const doctors = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const doctorModel = require("../models/Doctors");
doctors.use(cors());

process.env.SECRET_KEY = "secret";

doctors.post("/register", (req, res) => {
    const doctorData = {
        doctorNumber: req.body.doctorNumber,
        email: req.body.email,
        phone: req.body.phone,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    doctorModel.findOne({doctorNumber: req.body.doctorNumber}).then((doctor) => {
        if (!doctor) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                doctorData.password = hash;
                doctorModel.create(doctorData).then((doctor) => {
                    const payload = {
                        doctorNumber: doctor.doctorNumber,
                        email: doctor.email,
                        firstname: doctor.firstname,
                        lastname: doctor.lastname,
                        phone: doctor.phone
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {});
                    res.send(token);
                }).catch((err) => {
                    res.send("error" + err);
                });
            });
        } else {
            res.status(400).json({error: "doctor already exists"});
        }
    }).catch((err) => {
        res.send("error" + err);
    });
});

doctors.post("/login", (req, res) => {
    doctorModel.findOne({doctorNumber: req.body.doctorNumber}).then((doctor) => {
        if (doctor) {
            if (bcrypt.compareSync(req.body.password, doctor.password)) {
                const payload = {
                    doctorNumber: doctor.doctorNumber,
                    email: doctor.email,
                    firstname: doctor.firstname,
                    lastname: doctor.lastname
                };
                let token = jwt.sign(payload, process.env.SECRET_KEY, {});
                res.send({token: token});
            } else {
                res.status(401).json({error: "Password incorect"});
            }
        } else {
            res.status(401).json({error: "doctor does not exist"});
        }
    }).catch((err) => {
        res.send("error: " + err);
    });
});

doctors.get("/alldoctors", (req, res) => {
    doctorModel.find().then((doctor) => {
        res.send(doctor);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

doctors.get("/info", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    doctorModel.findOne({doctorNumber: decoded.doctorNumber}).then((doctor) => {
        const data = {
            email: doctor.email,
            doctorNumber: doctor.doctorNumber,
            phone: doctor.phone,
            firstname: doctor.firstname,
            lastname: doctor.lastname
        };
        res.send(data);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

doctors.put("/update", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    const info = {
        information: req.body.infoData
    }
    doctorModel.updateOne({
        doctorNumber: decoded.doctorNumber
    }, info).then((doctor) => {
        console.log(doctor);
        res.send("Profile updated!")
    }).catch((err) => {
        res.send("error: " + err);
    });
})
module.exports = doctors;
