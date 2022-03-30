const express = require("express");
const students = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const studentModel = require("../models/Student");
students.use(cors());

process.env.SECRET_KEY = "secret";

students.post("/register", (req, res) => {
  const studentData = {
    registrationNumber: req.body.oRegisterData.registrationNumber,
    email: req.body.oRegisterData.email,
    password: req.body.oRegisterData.password,
    username: req.body.oRegisterData.username,
  };
  console.log(req.body);
  studentModel
    .findOne({ email: req.body.oRegisterData.email })
    .then((student) => {
      if (!student) {
        bcrypt.hash(req.body.oRegisterData.password, 10, (err, hash) => {
          studentData.password = hash;
          studentModel
            .create(studentData)
            .then((student) => {
              const payload = {
                _id: student._id,
                email: student.email,
              };
              let token = jwt.sign(payload, process.env.SECRET_KEY, {});
              res.send(token);
            })
            .catch((err) => {
              res.send("error" + err);
            });
        });
      } else {
        res.status(400).json({ error: "student already exists" });
      }
    })
    .catch((err) => {
      res.send("error" + err);
    });
});

students.post("/login", (req, res) => {
  console.log(req.body);
  studentModel
    .findOne({ email: req.body.email })
    .then((student) => {
      if (student) {
        if (bcrypt.compareSync(req.body.password, student.password)) {
          const payload = {
            _id: student._id,
            email: student.email,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {});
          res.send(token);
        } else {
          res.status(401).json({ error: "Password incorect" });
        }
      } else {
        res.status(401).json({ error: "student does not exist" });
      }
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

students.get("/info", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );
  console.log("DECODED", decoded);
  studentModel
    .findOne({ email: decoded.email })
    .then((student) => {
      const data = {
        email: student.email,
        username: student.username,
      };
      res.send(data);
    })
    .catch((err) => {
      res.send("error: " + err);
    });
});

module.exports = students;
