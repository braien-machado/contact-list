interface IPhone {
  id?: number;
  phoneNumber: string;
  whatsapp: boolean;
  createdAt?: Date;
  updateAt?: Date;
  ownerId: number;
}

export default IPhone;
