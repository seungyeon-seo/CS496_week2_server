const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    personId: { type: String, required: true }, // ?
    image: { type: String },
})

const contactModel = mongoose.model("contact", contactSchema);

module.exports = {contactModel, contactSchema};