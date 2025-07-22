import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

const userService = new UserService();

export const createUser: (
  req: Request,
  res: Response,
  next: NextFunction,
) => void = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const userDetails = await userService.createUser(userData);
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyAccount: (
  req: Request,
  res: Response,
  next: NextFunction,
) => void = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      next('Invalid or missing verification token');
    }
    const userDetails = await userService.verifyUserAccount(token as string);
    return res.status(200).json({
      success: true,
      message: 'Account verified successfully',
      data: userDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: (
  req: Request,
  res: Response,
  next: NextFunction,
) => void = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const data = await userService.loginUser(email, password);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const addKycDetails: (
  req: Request,
  res: Response,
  next: NextFunction,
) => void = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id as string;
    const kycData = req.body;
    const kycDetails = await userService.addKycDetails(userId, kycData);
    return res.status(201).json({
      success: true,
      message: 'KYC details added successfully',
      data: kycDetails,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyKycDetails: (
  req: Request,
  res: Response,
  next: NextFunction,
) => void = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id as string;
    const kycDetails = await userService.getMyKycDetails(userId);
    return res.status(200).json({
      success: true,
      message: 'KYC details retrieved successfully',
      data: kycDetails,
    });
  } catch (error) {
    next(error);
  }
};