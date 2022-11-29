export interface IUser {
  email: string;
  password: string;
}

export interface IUserWithoutActivation {
  token: string;
}
