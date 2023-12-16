const {
  getAllContacts,
  addNewContact,
  deleteContact,
} = require("../db/services/contactsServices");

const getContacts = async (req, res) => {
  const contacts = await getAllContacts();

  res.json(contacts);
};

const addContact = async (req, res) => {
  const contact = await addNewContact(req.body);

  res.status(201).json(contact);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await deleteContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });

    return;
  }

  res.json(result);
};

module.exports = {
  getContacts,
  addContact,
  deleteContactById,
};
