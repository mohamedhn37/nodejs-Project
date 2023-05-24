const Contact = require("../models/Contact");

const getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find().exec();
    if (!contacts || contacts.length === 0) {
      return res.json({ error: "No data" });
    }
    res.json({ contacts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addContact = async (req, res) => {
  const {name, phone} = req.body;
  const newContact = new Contact({ name, phone });
  newContact.save()
    .then(() => res.json(newContact))
    .catch((err) => res.json({error : err}));
};

const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.json({ error: "No data" });
    }
    const { name, phone } = req.body;
    contact.name = name;
    contact.phone = phone;
    await contact.save();
    console.log("Contact modifié avec succès");
    res.json({ contacts: contact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contacts = await Contact.findByIdAndDelete(req.params.id).exec();
    if (!contacts || contacts.length === 0) {
      return res.json({ error: "No data" });
    }
    res.json({ contacts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getAllContact,  addContact, updateContact, deleteContact}