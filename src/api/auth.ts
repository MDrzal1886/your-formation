import { hash } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hashedPassword = await hash(password, +process.env.SALT_ROUNDS!);
  return hashedPassword;
};
