const express = require("express");
const therapists = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const therapistModel = require("../models/Therapist");
therapists.use(cors());

process.env.SECRET_KEY = "secret";

therapists.post("/register", (req, res) => {
    const therapistData = {
        email: req.body.email,
        phone: req.body.phone,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        username: req.body.username
    };
    therapistModel.findOne({email: req.body.email}).then((therapist) => {
        if (!therapist) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                therapistData.password = hash;
                therapistModel.create(therapistData).then((therapist) => {
                    const payload = {
                        _id: therapist._id,
                        email: therapist.email,
                        firstname: therapist.firstname,
                        lastname: therapist.lastname
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {});
                    res.send(token);
                }).catch((err) => {
                    res.send("error" + err);
                });
            });
        } else {
            res.status(400).json({error: "therapist already exists"});
        }
    }).catch((err) => {
        res.send("error" + err);
    });
});

therapists.post("/login", (req, res) => {
    therapistModel.findOne({email: req.body.email}).then((therapist) => {
        if (therapist) {
            if (bcrypt.compareSync(req.body.password, therapist.password)) {
                const payload = {
                    _id: therapist._id,
                    email: therapist.email
                };
                let token = jwt.sign(payload, process.env.SECRET_KEY, {});
                res.send(token);
            } else {
                res.status(401).json({error: "Password incorect"});
            }
        } else {
            res.status(401).json({error: "therapist does not exist"});
        }
    }).catch((err) => {
        res.send("error: " + err);
    });
});

therapists.get("/allTherapists", (req, res) => {
    therapistModel.find().then((therapist) => {
        res.send(therapist);
        console.log(therapist);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

therapists.get("/info", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    therapistModel.findOne({email: decoded.email}).then((therapist) => {
        const data = {
            email: therapist.email,
            username: therapist.username,
            phone: therapist.phone,
            firstname: therapist.firstname,
            lastname: therapist.lastname
        };
        res.send(data);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

module.exports = therapists;
