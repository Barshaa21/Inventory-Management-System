enum IGender {
  "MALE",
  "FEMALE",
}
export interface IUser {
  name: string;
  age: number;
  gender: IGender;
  firstName: string;
  password: string;
}
export interface IuserRegister {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}
export interface ISignup {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
export interface Itoken {
  token: string;
}
