const express = require("express");
const pacients = express.Router();
const cors = require("cors");

const pacientModel = require("../models/Pacients");
pacients.use(cors());

pacients.post("/add", (req, res) => {
    const pacientData = {
        cnp: req.body.cnp,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        dateIn: req.body.dateIn,
        dateOut: req.body.dateOut
    };
    console.log(pacientData);
    pacientModel.findOne({ cnp: req.body.cnp }).then((pacient) => {
        if(!pacient){
            pacientModel.create(pacientData).then((pacient) => {
                return res.json(pacient);
            }).catch((err) => {
                console.log(err);
                return res.send("error" + err);
            });
        }
    }).catch((err) => {
        res.send("error" + err);
    });
});

pacients.get("/pacient", (req, res) => {
    pacientModel.findOne({ cnp: req.body.cnp }).then((pacient) => {
        const data = {
            cnp: pacient.cnp,
            firstname: pacient.firstname,
            lastname: pacient.lastname,
            email: pacient.email,
            address: pacient.address,
            phone: pacient.phone,
            dateIn: req.body.dateIn,
            dateOut: req.body.dateOut
        };
        res.send(data);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

pacients.get("/allPacients", (req, res) => {
    pacientModel.find().then((pacient) => {
        res.send(pacient);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

pacients.delete("/delete", (req, res) => {
    console.log(req.body.cnp);
    pacientModel.deleteOne({ cnp: req.body.cnp}).then((pacients) => {
        res.send("pacient deleted!");
    }).catch((err) => {
        res.send("error: " + err);
    });
});

module.exports = pacients;
