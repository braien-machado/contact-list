interface IEmail {
  id?: number;
  email: string;
  createdAt?: Date;
  updateAt?: Date;
  ownerId: number;
}

export default IEmail;
