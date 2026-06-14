export interface SignupUserTypes {
  username: string;
  email: string;
  password: string;
}

export interface UserTypes {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  gender: string;
  role: string;
  slug: string;
}

export interface LoggedUser {
  _id: string;
  username: string;
  email: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface LoginUserTypes {
  email: string;
  password: string;
}
