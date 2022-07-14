import ContactModel from '../models/Contact';

export default class ContactService {
  public static async getContacts() {
    const contacts = await ContactModel.getContacts();

    return contacts;
  }

  public static async getContactById(id: number) {
    return ContactModel.getContactById(id);
  }

  public static async deleteContactById(id: number) {
    await ContactModel.deleteContactById(id);
  }
}
