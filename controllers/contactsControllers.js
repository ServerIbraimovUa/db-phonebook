const {
  getAllContacts,
  addNewContact,
  deleteContact,
} = require("../db/services/contactsServices");

const getContacts = async (req, res) => {
  const { _id } = req.user;

  const contacts = await getAllContacts(_id);

  res.json(contacts);
};

const addContact = async (req, res) => {
  const { _id } = req.user;
  const contact = await addNewContact(req.body, _id);

  res.status(201).json(contact);
};

const deleteContactById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;

  const result = await deleteContact(contactId, _id);
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
