import ContactModel from '../models/Model';

export default class ContactService {
  public static async getContacts() {
    const contacts = await ContactModel.getContacts();

    return contacts;
  }
}
