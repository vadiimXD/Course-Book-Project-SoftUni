const mongoose = require("mongoose")

const ModelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\//, "invalid url"],
    },
    age: {
        type: Number,
        required: true,
        min: 7,
        max: 100
    },
    born: {
        type: String,
        required: true,
    },
    nameInMovie: {
        type: String,
        required: true,

    }
})

const Model = mongoose.model("Model", ModelSchema)

module.exports = Model;