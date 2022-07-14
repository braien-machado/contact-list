import IPhone from '../interfaces/IPhone';
import PhoneModel from '../models/Phone';

export default class PhoneService {
  public static async getPhoneByParam(id: number, param = 'id') {
    return PhoneModel.getPhoneByParam(id, param);
  }

  public static async deletePhoneById(id: number) {
    await PhoneModel.deletePhoneById(id);
  }

  public static async updatePhoneById(id: number, obj: IPhone) {
    await PhoneModel.updatePhoneBydId(id, obj);
  }
}
