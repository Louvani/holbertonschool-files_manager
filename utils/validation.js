import check from 'express-validator';

const userValidation = [
  check('email')
    .notEmpty()
    .withMessage('Missing email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Email should be a valid email'),
  check('password')
    .notEmpty()
    .withMessage('Missing password'),
];

exports.userValidation = userValidation;
