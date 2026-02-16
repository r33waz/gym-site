export interface IAuth {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface forgetPassword {
  email: string;
}

export interface resetPassword {
  password: string;
  confirmPassword: string;
}

export interface login {
  email: string;
  password: string;
}

export interface changePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

