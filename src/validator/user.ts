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

const validateKycDetailsSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must not exceed 50 characters',
    'any.required': 'Name is required',
  }),
  bvn: Joi.string().length(11).pattern(/^\d+$/).required().messages({
    'string.base': 'BVN must be a string',
    'string.empty': 'BVN cannot be empty',
    'string.length': 'BVN must be exactly 11 digits long',
    'string.pattern.base': 'BVN must contain only digits',
    'any.required': 'BVN is required',
  }),
  industry: Joi.string()
    .valid(
      'Agriculture-AgriculturalCooperatives',
      'Agriculture-AgriculturalServices',
      'Commerce-Automobiles',
      'Commerce-DigitalGoods',
      'Commerce-PhysicalGoods',
      'Commerce-RealEstate',
      'Commerce-DigitalServices',
      'Commerce-LegalServices',
      'Commerce-PhysicalServices',
      'Commerce-ProfessionalServices',
      'Commerce-OtherProfessionalServices',
      'Education-NurserySchools',
      'Education-PrimarySchools',
      'Education-SecondarySchools',
      'Education-TertiaryInstitutions',
      'Education-VocationalTraining',
      'Education-VirtualLearning',
      'Education-OtherEducationalServices',
      'Gaming-Betting',
      'Gaming-Lotteries',
      'Gaming-PredictionServices',
      'FinancialServices-FinancialCooperatives',
      'FinancialServices-CorporateServices',
      'FinancialServices-PaymentSolutionServiceProviders',
      'FinancialServices-Insurance',
      'FinancialServices-Investments',
      'FinancialServices-AgriculturalInvestments',
      'FinancialServices-Lending',
      'FinancialServices-BillPayments',
      'FinancialServices-Payroll',
      'FinancialServices-Remittances',
      'FinancialServices-Savings',
      'FinancialServices-MobileWallets',
      'Health-Gyms',
      'Health-Hospitals',
      'Health-Pharmacies',
      'Health-HerbalMedicine',
      'Health-Telemedicine',
      'Health-MedicalLaboratories',
      'Hospitality-Hotels',
      'Hospitality-Restaurants',
      'Nonprofits-ProfessionalAssociations',
      'Nonprofits-GovernmentAgencies',
      'Nonprofits-NGOs',
      'Nonprofits-PoliticalParties',
      'Nonprofits-ReligiousOrganizations',
      'Nonprofits-Leisure_And_Entertainment',
      'Nonprofits-Cinemas',
      'Nonprofits-Nightclubs',
      'Nonprofits-Events',
      'Nonprofits-Press_And_Media',
      'Nonprofits-RecreationCentres',
      'Nonprofits-StreamingServices',
      'Logistics-CourierServices',
      'Logistics-FreightServices',
      'Travel-Airlines',
      'Travel-Ridesharing',
      'Travel-TourServices',
      'Travel-Transportation',
      'Travel-TravelAgencies',
      'Utilities-CableTelevision',
      'Utilities-Electricity',
      'Utilities-GarbageDisposal',
      'Utilities-Internet',
      'Utilities-Telecoms',
      'Utilities-Water',
      'Retail',
      'Wholesale',
      'Restaurants',
      'Construction',
      'Unions',
      'RealEstate',
      'FreelanceProfessional',
      'OtherProfessionalServices',
      'OnlineRetailer',
      'OtherEducationServices',
    )
    .required()
    .messages({
      'string.base': 'Industry must be a string',
      'string.empty': 'Industry cannot be empty',
      'any.required': 'Industry is required',
      'any.only': 'Industry must be one of the predefined values',
    }),
  registrationType: Joi.string()
    .valid(
      'Private_Incorporated',
      'Incorporated_Trustees',
      'Business_Name',
      'Free_Zone',
      'Gov',
      'Private_Incorporated_Gov',
      'Cooperative_Society',
      'Public_Incorporated',
    )
    .required()
    .messages({
      'string.base': 'Registration type must be a string',
      'any.required': 'Registration type is required',
      'any.only': 'Registration type must be one of the predefined values',
    }),
  dateOfRegistration: Joi.string().required().messages({
    'string.base': 'Date of registration must be a string',
    'string.empty': 'Date of registration cannot be empty',
    'any.required': 'Date of registration is required',
  }),
  description: Joi.string().min(10).max(500).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description must not exceed 500 characters',
    'any.required': 'Description is required',
  }),
  country: Joi.string().min(2).max(50).required().messages({
    'string.base': 'Country must be a string',
    'string.empty': 'Country cannot be empty',
    'string.min': 'Country must be at least 2 characters long',
    'string.max': 'Country must not exceed 50 characters',
    'any.required': 'Country is required',
  }),
  website: Joi.string(),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
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
  address: Joi.object({
    line1: Joi.string().required().messages({
      'string.base': 'Address line 1 must be a string',
      'string.empty': 'Address line 1 cannot be empty',
      'any.required': 'Address line 1 is required',
    }),
    line2: Joi.string().optional().allow(''),
    city: Joi.string().required().messages({
      'string.base': 'City must be a string',
      'string.empty': 'City cannot be empty',
      'any.required': 'City is required',
    }),
    state: Joi.string().required().messages({
      'string.base': 'State must be a string',
      'string.empty': 'State cannot be empty',
      'any.required': 'State is required',
    }),
    country: Joi.string().required().messages({
      'string.base': 'Country must be a string',
      'string.empty': 'Country cannot be empty',
      'any.required': 'Country is required',
    }),
    postalCode: Joi.string().required().messages({
      'string.base': 'Postal code must be a string',
      'string.empty': 'Postal code cannot be empty',
      'any.required': 'Postal code is required',
    }),
  })
    .required()
    .messages({
      'object.base': 'Address must be an object',
      'object.empty': 'Address cannot be empty',
      'any.required': 'Address is required',
    }),
  officers: Joi.array().items(
    Joi.object({
      firstName: Joi.string().required().messages({
        'string.base': 'Officer first name must be a string',
        'string.empty': 'Officer first name cannot be empty',
        'any.required': 'Officer first name is required',
      }),
      lastName: Joi.string().required().messages({
        'string.base': 'Officer last name must be a string',
        'string.empty': 'Officer last name cannot be empty',
        'any.required': 'Officer last name is required',
      }),
      middleName: Joi.string().optional(),
      maidenName: Joi.string().optional(),
      role: Joi.string().required().messages({
        'string.base': 'Officer role must be a string',
        'string.empty': 'Officer role cannot be empty',
        'any.required': 'Officer role is required',
      }),
      dateOfBirth: Joi.string().required().messages({
        'string.base': 'Officer date of birth must be a string',
        'string.empty': 'Officer date of birth cannot be empty',
        'any.required': 'Officer date of birth is required',
      }),
      percentageOwned: Joi.number().min(0).max(100).required().messages({
        'number.base': 'Percentage owned must be a number',
        'number.min': 'Percentage owned must be at least 0',
        'number.max': 'Percentage owned must not exceed 100',
        'any.required': 'Percentage owned is required',
      }),
      bvn: Joi.string().length(11).pattern(/^\d+$/).required().messages({
        'string.base': 'Officer BVN must be a string',
        'string.empty': 'Officer BVN cannot be empty',
        'string.length': 'Officer BVN must be exactly 11 digits long',
        'string.pattern.base': 'Officer BVN must contain only digits',
        'any.required': 'Officer BVN is required',
      }),
      address: Joi.object({
        line1: Joi.string().required().messages({
          'string.base': 'Address line 1 must be a string',
          'string.empty': 'Address line 1 cannot be empty',
          'any.required': 'Address line 1 is required',
        }),
        line2: Joi.string().optional().allow(''),
        city: Joi.string().required().messages({
          'string.base': 'City must be a string',
          'string.empty': 'City cannot be empty',
          'any.required': 'City is required',
        }),
        state: Joi.string().required().messages({
          'string.base': 'State must be a string',
          'string.empty': 'State cannot be empty',
          'any.required': 'State is required',
        }),
        country: Joi.string().required().messages({
          'string.base': 'Country must be a string',
          'string.empty': 'Country cannot be empty',
          'any.required': 'Country is required',
        }),
        postalCode: Joi.string().required().messages({
          'string.base': 'Postal code must be a string',
          'string.empty': 'Postal code cannot be empty',
          'any.required': 'Postal code is required',
        }),
      }).messages({
        'object.base': 'Address must be an object',
        'object.empty': 'Address cannot be empty',
        'any.required': 'Address is required',
      }),
    }),
  ),
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

export const validateKycDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validateKycDetailsSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    res.status(422).json({
      success: false,
      message: error?.details[0]?.message,
      error: error.toString(),
    });
  }
};