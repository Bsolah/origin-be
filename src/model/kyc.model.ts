import { required } from 'joi';
import mongoose from 'mongoose';
export interface IKYC extends mongoose.Document {
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  type: string;
  name: string;
  bvn: string;
  industry: string;
  registrationType: string;
  dateOfRegistration: string;
  description: string;
  country: string;
  website: string;
  email: string;
  phoneNumber: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  officers: {
    firstName: string;
    lastName: string;
    middleName?: string;
    maidenName?: string;
    role: string;
    dateOfBirth: string;
    percentageOwned: number;
    bvn: string;
    nationality: string;
    email: string;
    phoneNumber: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
  }[];
}
const kycSchema = new mongoose.Schema<IKYC>(
  {
    userId: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    type: { type: String, required: true, default: 'business' },
    name: { type: String, required: true },
    bvn: { type: String, required: true },
    industry: { type: String, required: true },
    registrationType: { type: String, required: true },
    dateOfRegistration: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    officers: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String },
        maidenName: { type: String },
        role: { type: String, required: true },
        dateOfBirth: { type: String, required: true },
        percentageOwned: { type: Number, required: true },
        bvn: { type: String, required: true },
        address: {
          line1: { type: String, required: true },
          line2: { type: String },
          city: { type: String, required: true },
          state: { type: String, required: true },
          country: { type: String, required: true },
          postalCode: { type: String, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Kyc = mongoose.model<IKYC>('KYC', kycSchema);
export default Kyc;