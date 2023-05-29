const express = require('express')
const { getAllContact, getContactById, addContact, updateContact, deleteContact} = require("../controllers/Contact")

const contactRoutes = express.Router();

contactRoutes.get('/contacts', getAllContact);
contactRoutes.get('/contacts/:id', getContactById);
contactRoutes.post('/contacts/add', addContact);
contactRoutes.put('/contacts/:id', updateContact);
contactRoutes.delete('/contacts/:id', deleteContact);

module.exports = contactRoutes