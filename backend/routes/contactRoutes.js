const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
router.get(`/contacts`, contactController.getAllContacts);
router.post(`/contacts`, contactController.createContact);
router.put(`/contacts/:id`, contactController.updateContact);
router.delete(`/contacts/:id`, contactController.deleteContact);
router.delete(`/contacts`, contactController.deleteSelectedContacts);
module.exports = router;