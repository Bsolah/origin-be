import { BaseError } from '../errors/error';
import { IUser } from '../model/user.model';
import KycRepository from '../repository/kyc.repository';
import UserRepository from '../repository/user.repository';
import { comparePassword, hashPassword } from '../utils/passwordHashing';
import sendMail from '../utils/sendMail';
import {
  createAccountVerificationToken,
  createLoginToken,
  verifyAccountVerificationToken,
} from '../utils/tokenManagement';
import verificationEmailTemplate, {
  onboardingAcknowledgmentTemplate,
} from '../views/verification-email';
import { google } from 'googleapis';

const credentials = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY!, 'base64').toString(
    'utf-8',
  ),
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log(process.env.GOOGLE_SHEET_ID);

const range = 'Responses!A1'; // Adjust this to your sheet name and range
class UserService {
  private userRepository: UserRepository;
  private kycRepository: KycRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.kycRepository = new KycRepository();
  }

  async createUser(userData: Partial<IUser>) {
    try {
      const sheets = google.sheets({ version: 'v4', auth });
      const existingUser = await this.userRepository.findUserByEmail(
        userData.email!,
      );
      if (existingUser && existingUser.isVerified) {
        // throw new BaseError('User already exists', 400);
        return;
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
        // await sendMail(
        //   userDetails.email!,
        //   'Account Verification',
        //   verificationEmailTemplate(
        //     userDetails.name!,
        //     `http://localhost:3000/api/v1/auth/verify-account?token=${verificationToken}`,
        //   ),
        // );
        // const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
        // await sheets.spreadsheets.values.append({
        //   spreadsheetId,
        //   range,
        //   valueInputOption: 'RAW',
        //   requestBody: {
        //     values: [
        //       [
        //         userData.name,
        //         userData.email,
        //         userData.phoneNumber,
        //         userData.country,
        //         userData.businessType,
        //         new Date().toLocaleDateString('en-US', {
        //           month: 'long', // April
        //           weekday: 'short', // Thu
        //           day: 'numeric', // 17
        //           year: 'numeric', // 2023
        //           hour: '2-digit', // 12
        //           minute: '2-digit', // 30
        //           second: '2-digit', // 30
        //           hour12: true, // 12-hour format
        //         }),
        //       ],
        //     ],
        //   },
        // });
        return userDetails;
      } else {
        const hashedPassword = await hashPassword(userData.password!);
        // If user does not exist, create a new user
        const userDetails = await this.userRepository.createUser({
          ...userData,
          password: hashedPassword,
        });
        // const verificationToken = await createAccountVerificationToken(
        //   userDetails._id as unknown as string,
        // );
        await sendMail(
          userDetails.email!,
          'Thank you for signing up',
          onboardingAcknowledgmentTemplate(userDetails.name),
        );
        const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range,
          valueInputOption: 'RAW',
          requestBody: {
            values: [
              [
                userData.name,
                userData.email,
                userData.phoneNumber,
                userData.country,
                userData.country,
                new Date().toLocaleDateString('en-US', {
                  month: 'long', // April
                  weekday: 'short', // Thu
                  day: 'numeric', // 17
                  year: 'numeric', // 2023
                  hour: '2-digit', // 12
                  minute: '2-digit', // 30
                  second: '2-digit', // 30
                  hour12: true, // 12-hour format
                }),
              ],
            ],
          },
        });
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

      return { data: user, token };
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

  async addKycDetails(userId: string, kycData: any): Promise<any> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new BaseError('User not found', 404);
      }
      if (!user.isVerified) {
        throw new BaseError('User not verified', 403);
      }
      const existingKyc = await this.kycRepository.findKycByUserId(userId);
      if (existingKyc) {
        await this.kycRepository.updateKyc(
          existingKyc._id as unknown as string,
          kycData,
        );
        return existingKyc;
      }
      const kyc = await this.kycRepository.createKyc(userId, kycData);
      return kyc;
    } catch (error) {
      if (error instanceof BaseError) {
        throw error; // Re-throw known BaseErrors
      }
      throw new BaseError('Error adding KYC details', 400, error);
    }
  }
}

export default UserService;
