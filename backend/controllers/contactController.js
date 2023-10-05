const Contact = require("../models/contact");
const { validationResult } = require('express-validator');
const csv = require('csv-parser');
const fs = require('fs');
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}
exports.createContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(200).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
}
exports.updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedContact)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"})
    }
}
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndRemove(req.params.id);
        if(!deletedContact){
            return res.status(404).json({ message: "Contact not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Servor Error"});
    }
}
exports.uploadCSV = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const results = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                // Insert the data from the CSV file into your database
                for (const row of results) {
                    const newContact = new Contact(row);
                    await newContact.save();
                }
                // Remove the temporary CSV file
                fs.unlinkSync(req.file.path);
                res.status(200).json({ message: 'CSV file uploaded successfully' });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};