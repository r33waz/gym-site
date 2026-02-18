import jwt from "jsonwebtoken";

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
}
export const genAccesssToken = (user: IUser, secret: string) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    secret,
  );
};

export const genRefreshToken = (user: IUser, secret: string) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    secret,
  );
};

export const decodeToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
