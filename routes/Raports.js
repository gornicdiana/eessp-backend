const express = require("express");
const raports = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const raportModel = require("../models/Raports");
raports.use(cors());

process.env.SECRET_KEY = "secret";
raports.post("/add", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    console.log("**************************************************", decoded);
    const raportData = {
        flag: true,
        doctorNumber: decoded.doctorNumber,
        cnp: req.body.cnp,
        doctorFirstname: req.body.doctorFirstname,
        dorctorLastname: req.body.dorctorLastname,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        serieNr: req.body.serieNr,
        varsta: req.body.varsta,
        sex: req.body.sex,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        alergic: req.body.alergic,
        grup: req.body.grup,
        rh: req.body.rh,
        diagInt: req.body.diagInt,
        diag72: req.body.diag72,
        diagPr: req.body.diagPr,
        tehnica: req.body.tehnica,
        boalaInt: req.body.boalaInt,
        dataInt: req.body.dataInt,
        dataExt: req.body.dataExt,
        stareExt: req.body.stareExt,
        transfer: req.body.transfer,
        diagDeces: req.body.diagDeces,
        varstaTata: req.body.varstaTata,
        varstaMama: req.body.varstaMama,
        alteAfectiuni: req.body.alteAfectiuni,
        evolutieSarcina: req.body.evolutieSarcina,
        nrControale: req.body.nrControale,
        nrCopii: req.body.nrCopii,
        nrLuni: req.body.nrLuni,
        greutateCopil: req.body.greutateCopil,
        lungime: req.body.lungime,
        nastere: req.body.nastere,
        dataNastere: req.body.dataNastere,
        istoric: req.body.istoric,
        temp: req.body.temp,
        greutate: req.body.greutate,
        rezInter: req.body.rezInter,
        starePrez: req.body.starePrez,
        prescriptie: req.body.prescriptie,
        evolutie: req.body.evolutie
    };
    raportModel.findOne({ cnp: req.body.cnp }).then((pacient) => {
        if (!pacient) {
            raportModel.create(raportData).then((raport) => {
                return res.json(raport);
            }).catch((err) => {
                console.log(err);
                return res.send("error" + err);
            });
        }
    }).catch((err) => {
        res.send("error" + err);
    });
});

raports.get("/myRaports", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    console.log(decoded);

    raportModel.find({ doctorNumber: decoded.doctorNumber }).then((raport) => {
        res.send(raport);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

raports.get("/allraports", (req, res) => {
    raportModel.find().then((raport) => {
        res.send(raport);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

raports.get("/raport", (req, res) => {
    let cnp = req.headers["authorization"];
    console.log(cnp);
    raportModel.findOne({ cnp: cnp }).then((raport) => {
        res.send(raport);
        console.log(raport);
    }).catch((err) => {
        console.log(err);
        return res.send("error" + err);
    });
});

raports.put("/archive", async (req, res) => {
    let cnp = req.headers["authorization"];
    // let archive = {
    //     flag: true
    // }
    console.log("??????", cnp);
    const raport = await raportModel.findOneAndUpdate({ cnp: cnp }, { flag: true }, {new: true})
    return res.send(raport);
});

module.exports = raports;
