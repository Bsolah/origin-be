import { BaseError } from '../errors/error';
import { IUser } from '../model/user.model';
import UserRepository from '../repository/user.repository';
import { comparePassword, hashPassword } from '../utils/passwordHashing';
import sendMail from '../utils/sendMail';
import {
  createAccountVerificationToken,
  createLoginToken,
  verifyAccountVerificationToken,
} from '../utils/tokenManagement';
import verificationEmailTemplate from '../views/verification-email';

class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: Partial<IUser>) {
    try {
      const existingUser = await this.userRepository.findUserByEmail(
        userData.email!,
      );
      if (existingUser && existingUser.isVerified) {
        throw new BaseError('User already exists', 400);
      } else if (existingUser && !existingUser.isVerified) {
        // If user exists but is not verified, update the user data
        const hashedPassword = await hashPassword(userData.password!);

        const userDetails = await this.userRepository.updateUser(
          existingUser._id as unknown as string,
          { ...userData, password: hashedPassword },
        );
        if (!userDetails) {
          throw new BaseError('User not found', 404);
        }
        const verificationToken = await createAccountVerificationToken(
          userDetails._id as unknown as string,
        );
        await sendMail(
          userDetails.email!,
          'Account Verification',
          verificationEmailTemplate(
            userDetails.name!,
            `http://localhost:3000/api/v1/auth/verify-account?token=${verificationToken}`,
          ),
        );
        return userDetails;
      } else {
        const hashedPassword = await hashPassword(userData.password!);
        // If user does not exist, create a new user
        const userDetails = await this.userRepository.createUser({
          ...userData,
          password: hashedPassword,
        });
        const verificationToken = await createAccountVerificationToken(
          userDetails._id as unknown as string,
        );
        await sendMail(
          userDetails.email!,
          'Account Verification',
          verificationEmailTemplate(
            userDetails.name!,
            `http://localhost:3000/api/v1/auth/verify-account?token=${verificationToken}`,
          ),
        );
        return userDetails;
      }
    } catch (error) {
      if (error instanceof BaseError) {
        throw error; // Re-throw known BaseErrors
      }
      throw new BaseError('Error creating user', 400, error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new BaseError('Invalid Login Credentials', 404);
      }
      if (!user.isVerified) {
        throw new BaseError('User not verified', 403);
      }
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw new BaseError('Invalid Login Credentials', 400);
      }
      const token = await createLoginToken(
        user._id as unknown as string,
        user.email,
      );

      return { user, token };
    } catch (error) {
      if (error instanceof BaseError) {
        throw error; // Re-throw known BaseErrors
      }
      throw new BaseError('Error creating user', 400, error);
    }
  }

  async verifyUserAccount(token: string) {
    try {
      const userId = await verifyAccountVerificationToken(token);
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new BaseError('User not found', 404);
      }
      if (user.isVerified) {
        throw new BaseError('User already verified', 400);
      }
      user.isVerified = true;
      await user.save();
      return user;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error; // Re-throw known BaseErrors
      }
      throw new BaseError('Error verifying user account', 400, error);
    }
  }
}

export default UserService;
