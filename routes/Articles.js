const express = require("express");
const articles = express.Router();
const cors = require('cors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const articleModel = require("../models/Article");
articles.use(cors());

process.env.SECRET_KEY = "secret";
articles.post("/add", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    console.log(decoded);

    const articleData = {
        email: decoded.email,
        author: "" + decoded.firstname + " " + decoded.lastname,
        title: req.body.title,
        category: req.body.category,
        body: req.body.body
    };
    console.log(articleData);
    articleModel.create(articleData).then((article) => {
        return res.json(article);
    }).catch((err) => {
        console.log(err);
        return res.send("error" + err);
    });
});

articles.get("/myArticles", (req, res) => {
    let decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY);
    console.log(decoded);

    articleModel.find({email: decoded.email}).then((article) => {
        console.log(article);
        res.send(article);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

articles.get("/allArticles", (req, res) => {
    articleModel.find().then((article) => {
        console.log(article);
        res.send(article);
    }).catch((err) => {
        res.send("error: " + err);
    });
});

module.exports = articles;
