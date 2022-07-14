import PhoneModel from '../models/Phone';

export default class PhoneService {
  public static async getPhoneById(id: number) {
    return PhoneModel.getPhoneById(id);
  }

  public static async deletePhoneById(id: number) {
    await PhoneModel.deletePhoneById(id);
  }
}
