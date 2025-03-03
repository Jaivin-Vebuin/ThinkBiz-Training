import Joi from 'joi';

export const registerSchema = Joi.object({
  userName: Joi.string().required().messages({
    'any.required': 'Name is required.',
    'string.base': 'Name must be a string.',
  }),
  userEmail: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Please enter a valid email address.',
    'string.base': 'Email must be a string.',
  }),
  userPassword: Joi.string().min(6).required().messages({
    'any.required': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'string.base': 'Password must be a string.',
  }),
  userRole: Joi.string().required().messages({
    'any.required': 'Role is required.',
    'string.base': 'Role must be a string.',
  }),
  userAge: Joi.number().integer().min(18).required().messages({
    'any.required': 'Age is required.',
    'number.base': 'Age must be a number.',
    'number.min': 'Age must be at least 18.',
    'number.integer': 'Age must be an integer.',
  }),
});

export const loginSchema = Joi.object({
  userEmail: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Please enter a valid email address.',
    'string.base': 'Email must be a string.',
  }),
  userPassword: Joi.string().min(6).required().messages({
    'any.required': 'Password is required.',
    'string.min': 'Password must be at least 6 characters long.',
    'string.base': 'Password must be a string.',
  }),
});
