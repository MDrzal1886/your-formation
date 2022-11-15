import { compare, hash } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, +process.env.SALT_ROUNDS!);
  return hashedPassword;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};
