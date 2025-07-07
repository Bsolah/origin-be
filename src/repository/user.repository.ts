import User, { IUser } from "../model/user.model";

class UserRepository {
    async createUser(userData: Partial<IUser>) {
        const user = await User.create(userData);
        return user;
    }

    async findUserByEmail(email: string) {
        const user = await User.findOne({ email });
        return user;
    }

    async findUserById(userId: string) {
        const user = await User.findById(userId);
        return user;
    }

    async updateUser(userId: string, updateData: Partial<IUser>) {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return user;
    }
}

export default UserRepository