export interface authLogin {
  email: string;
  password: string;
}

export interface authRegister {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}
