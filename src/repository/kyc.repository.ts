import Kyc from "../model/kyc.model";

class KycRepository {

    async createKyc(userId: string, kycData: any): Promise<any> {
        const kyc = await Kyc.create({
            userId,
            ...kycData,
        });
        return kyc;
    }

    async findKycByUserId(userId: string): Promise<any> {
        const kyc = await Kyc.findOne({ userId });
        return kyc;
    }

    async updateKyc(kycId: string, updateData: any): Promise<any> {
        const kyc = await Kyc.findByIdAndUpdate(kycId, updateData, { new: true });
        return kyc;
    }
}

export default KycRepository;