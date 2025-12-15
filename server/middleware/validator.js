const validator = (schema) => async (req, res, next) => {
  const parseBody = await schema.parseAsync(req.body);
  req.body = parseBody;
  next();
};

module.exports = validator;
