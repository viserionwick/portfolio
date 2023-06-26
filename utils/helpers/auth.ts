// Essentials
import { signIn } from "next-auth/react";

// Type
export interface LoginUserParams {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginUserParams) => {
  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  return res;
};
