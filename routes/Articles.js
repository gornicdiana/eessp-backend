const express = require("express");
const articles = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const articleModel = require("../models/Article");
articles.use(cors());

process.env.SECRET_KEY = "secret";
articles.post("/add", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  const articleData = {
    Author: decoded.email,
    Title: req.body.Title,
    Category: req.body.Category,
    Body: req.body.Body,
  };
  console.log(decoded);
  articleData.Author = decoded.email;
  articleModel
    .create(articleData)
    .then((article) => {
      console.log(article);
      return res.json(article);
    })
    .catch((err) => {
      console.log(err);
      return res.send("error" + err);
    });
});

module.exports = articles;
