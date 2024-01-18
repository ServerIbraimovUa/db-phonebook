const express = require("express");
const {
  getContacts,
  addContact,
  deleteContactById,
} = require("../controllers/contactsControllers");
const { contactsSchema } = require("../schemas/contactsSchemas");
const validateBody = require("../decorators/validateBody");
const isValidId = require("../middlewares/isValidId");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, getContacts);

router.post("/", authenticate, validateBody(contactsSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, deleteContactById);

module.exports = router;
