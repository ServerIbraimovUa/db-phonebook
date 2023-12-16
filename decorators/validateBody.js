const validateBody = (schema) => {
  const fn = async (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    next();
  };

  return fn;
};

module.exports = validateBody;
