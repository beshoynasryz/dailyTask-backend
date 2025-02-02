import { body } from 'express-validator';

export const taskValidationRules = [
  body('description')
    .notEmpty()
    .withMessage('Task description is required'),

  body('from')
    .isISO8601()
    .withMessage('Start time must be a valid date'),

  body('to')
    .isISO8601()
    .withMessage('End time must be a valid date')
    .custom((value, { req }) => {
      const from = new Date(req.body.from);
      const to = new Date(value);
      const duration = (to - from) / (1000 * 60 * 60); // Convert to hours
      if (duration > 8) {
        throw new Error('Task duration cannot exceed 8 hours');
      }
      return true;
    }),

  body('employeeId')
    .notEmpty()
    .withMessage('Employee ID is required')
    .isMongoId()
    .withMessage('Invalid Employee ID'),
];
