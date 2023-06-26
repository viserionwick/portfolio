import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../utils/models/user";
import { IUser } from "../../../utils/models/user";
import mongoose from "mongoose";
import { checkUserPermissions } from "../../../utils/helpers/checkUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  dbConnect().catch((err) => res.json(err));

  if (req.method === "POST") {
    if (!req.body) return res.status(400).json({ error: "Data is missing" });

    checkUserPermissions(["createUser"])(req, res, async () => {
      const { fullName, email, role, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(409).json({ error: "User Already exists" });
      } else {
        if (password.length < 6)
          return res
            .status(409)
            .json({ error: "Password should be at least 6 characters long" });

        const hashedPassword = await hash(password, 12);

        User.create({
          fullName,
          email,
          role,
          password: hashedPassword,
        })
          .then((data: IUser) => {
            const user = {
              email: data.email,
              fullName: data.fullName,
              _id: data._id,
            };

            return res.status(201).json({
              success: true,
              user,
            });
          })
          .catch((error: unknown) => {
            if (error && error instanceof mongoose.Error.ValidationError) {
              for (let field in error.errors) {
                const msg = error.errors[field].message;
                return res.status(409).json({ error: msg });
              }
            }
          });
      }
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
