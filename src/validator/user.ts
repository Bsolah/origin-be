import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const validateCreateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must not exceed 50 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must not exceed 100 characters',
    'any.required': 'Password is required',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base':
        'Phone number must be a valid international format',
      'any.required': 'Phone number is required',
    }),
  country: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Country must be a string',
    'string.empty': 'Country cannot be empty',
    'string.min': 'Country must be at least 2 characters long',
    'string.max': 'Country must not exceed 50 characters',
    'any.required': 'Country is required',
  }),
  businessType: Joi.string().required().messages({
    'string.base': 'Business type must be a string',
    'any.only': 'Business type must be either "individual" or "business"',
    'any.required': 'Business type is required',
  }),
});

const validateLoginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must not exceed 100 characters',
    'any.required': 'Password is required',
  }),
});

export const validateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
      await validateCreateUserSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    res.status(422).json({
      success: false,
      message: error?.details[0]?.message,
      error: error.toString(),
    });
  }
};

export const validateLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validateLoginUserSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    res.status(422).json({
      success: false,
      message: error?.details[0]?.message,
      error: error.toString(),
    });
  }
};