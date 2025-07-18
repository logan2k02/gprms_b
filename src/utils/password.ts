import argon2 from "argon2";

export const hashPassword = async (password: string): Promise<string> => {
  return argon2.hash(password);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await argon2.verify(hash, password);
  } catch (error) {
    return false;
  }
};
