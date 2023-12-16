const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    res.status(404).json("Not found");

    return;
  }

  next();
};

module.exports = isValidId;
