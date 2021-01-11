const mongoose = require('mongoose');

var Long = mongoose.Schema.Types.Long;
const contactSchema = new mongoose.Schema({
    fullName: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    lookup: { type: String, required: true, unique: true },
    personId: { type: String, required: true, unique: true },
    image: { type: String, required: false, unique: false },
    groupId: { type: Number, required: false, unique: false },
    status: { type: Number, required: false, unique: false },
    location: { type: String, required: false, unique: false } 
})
// contactSchema.index({ fullName: 1, phone: 1 });

module.exports = mongoose.model('contacts', contactSchema);