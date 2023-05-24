const express = require('express')
const { getAllContact,  addContact, updateContact, deleteContact} = require("../controllers/Contact")

const contactRoutes = express.Router();

contactRoutes.get('/contacts', getAllContact);
contactRoutes.post('/contacts/add', addContact);
contactRoutes.put('/contacts/:id', updateContact);
contactRoutes.delete('/contacts/:id', deleteContact);

module.exports = contactRoutes