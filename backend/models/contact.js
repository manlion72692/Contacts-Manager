const mongoose = require("mongoose");
const {Schema} = mongoose;
const contactSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        requied: true,
    },
})
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;