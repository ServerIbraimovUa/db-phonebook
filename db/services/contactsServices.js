const Contact = require("../models/contactModels");

const getAllContacts = async (owner) => {
  const contacts = await Contact.find({ owner });

  return contacts;
};

const addNewContact = async (body, owner) => {
  const newContact = await Contact.create({ ...body, owner });

  return newContact;
};

const deleteContact = async (contactId, owner) => {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    owner,
  });

  return deletedContact;
};

module.exports = {
  getAllContacts,
  addNewContact,
  deleteContact,
};
