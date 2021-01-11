const mongoose = require('mongoose');

const Long = mongoose.Schema.Types.Long;
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

const contactModel = mongoose.model("group", contactSchema);

module.exports = contactModel;