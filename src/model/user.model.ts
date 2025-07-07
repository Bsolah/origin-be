import mongoose from "mongoose";

export interface IUser { 
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    country: string;
    businessType: string;
    isVerified: boolean
}

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    country: { type: String, required: true },
    businessType: { type: String, required: true },
    isVerified: { type: Boolean, default: false }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;