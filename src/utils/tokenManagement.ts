import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createAccountVerificationToken = async (userId: string): Promise<string> => { 
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: '1h', // Token expires in 1 hour
    })
    return token
}

export const verifyAccountVerificationToken = async (token: string): Promise<string> => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        return decoded.userId;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

export const createLoginToken = async (id: string, email: string): Promise<string> => { 
    const token = jwt.sign({ id, email }, process.env.JWT_SECRET!, {
        expiresIn: '30d', // Token expires in 1 day
    })
    return token
}