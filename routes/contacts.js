const express = require("express");
const {
  getContacts,
  addContact,
  deleteContactById,
} = require("../controllers/contactsControllers");
const { contactsSchema } = require("../schemas/contactsSchemas");
const validateBody = require("../decorators/validateBody");
const isValidId = require("../middlewares/isValidId");

const router = express.Router();

router.get("/", getContacts);

router.post("/", validateBody(contactsSchema), addContact);

router.delete("/:contactId", isValidId, deleteContactById);

module.exports = router;
