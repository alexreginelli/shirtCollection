const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const photoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Shirt = mongoose.model("shirt", photoSchema);

module.exports = Shirt;