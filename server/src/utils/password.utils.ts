import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

// ✅ hash password
export const generatePassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// ✅ compare password
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
