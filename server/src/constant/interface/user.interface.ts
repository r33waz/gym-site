export interface IUserDTO {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  contactNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface IUserUpdateDTO {
  username?: string;
  email?: string;
  role?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  contactNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface IUser {
  id?: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  contactNumber: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}
