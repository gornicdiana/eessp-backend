const express = require("express")
const articles = express.Router()
const cors = require("cors")
const articlesModel = require("../models/Article")


module.exports = articles
