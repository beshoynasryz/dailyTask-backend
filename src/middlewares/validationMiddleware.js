import { validationResult } from 'express-validator';

const validate = (validations) => {
  return async (req, res, next) => {
    // Run the validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Get validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map((err) => err.msg) });
    }

    next();
  };
};

export default validate;
