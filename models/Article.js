const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: String,
        required: true
    },
    Body: {
        type: String,
        required: true
    }
})

module.exports = Article = mongoose.model('articles', ArticleSchema)
