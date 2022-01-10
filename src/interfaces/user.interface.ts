export interface IUser {
  name: string;
  email: string;
  phone: string;
  occupation: string;
  password?: string;
}

export interface IUpdateUser {
  name?: string;
  email?: string;
  phone?: string;
  occupation?: string;
  password?: string;
}
