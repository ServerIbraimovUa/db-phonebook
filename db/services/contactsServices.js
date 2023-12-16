const Contact = require("../models/contactModels");

const getAllContacts = async () => {
  const contacts = await Contact.find();

  return contacts;
};

const addNewContact = async (body) => {
  const newContact = await Contact.create(body);

  return newContact;
};

const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  return deletedContact;
};

module.exports = {
  getAllContacts,
  addNewContact,
  deleteContact,
};
