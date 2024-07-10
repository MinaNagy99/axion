const { AppError } = require("../utilities/AppError.js");

const validation = (schema) => {
  return (req, res, next) => {
    let input = { ...req.body, ...req.params, ...req.query };
    let { error } = schema.validate(input, { abortEarly: false });
    if (error) {
      let errors = error.details.map((detail) => detail.message);
      return next(new AppError(errors));
    } else {
      next();
    }
  };
};
module.exports = { validation };
