import IEmail from './IEmail';
import IPhone from './IPhone';

interface IContact {
  id?: number;
  fullName: string;
  createdAt?: Date;
  updateAt?: Date;
  phoneNumbers?: IPhone[];
  emails?: IEmail[];
}

export default IContact;
