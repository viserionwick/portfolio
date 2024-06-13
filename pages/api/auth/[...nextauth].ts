// Essentials
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import dbConnect from "../../../utils/dbConnect";

// Utils
import User from "../../../utils/models/user";
import { IUser } from "../../../utils/models/user";

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect().catch((err) => {
          throw new Error(err);
        });

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) {
          throw new Error("Email or password is wrong.");
        }

        const isPasswordCorrect = await compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Email or password is wrong.");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/admin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = {
        _id: (token.user as any)._id,
        fullName: (token.user as any).fullName,
        role: (token.user as any).role,
        username: (token.user as any).username,
        email: (token.user as any).email,
      } as IUser;

      session.user = user;

      return session;
    },
  },
};

/* export default NextAuth(options); */

const authHandler = NextAuth(options);
export default async function handler(...params: any[]) {
  await authHandler(...params);
}