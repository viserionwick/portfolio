// Essentials
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";

// Utils
import User from "../../../utils/models/user";
import { IUser } from "../../../utils/models/user";
import { checkUserPermissions } from "../../../utils/helpers/checkUser";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const clearRegex = /\s{2,}/g;

  try {
    dbConnect().catch((err) => res.json(err));
  
    if (req.method === "POST") {
      if (!req.body) return res.status(400).json({ error: "Data is missing..." });
      

      await checkUserPermissions(["createUser"], req)
      .then(async () => {
        const { fullName, email, role, password } = req.body;
        const cleanFullName = fullName.replace(clearRegex, ' ').trim();
        const cleanEmail = email.replace(clearRegex, ' ').trim();

        const userExists = await User.findOne({ cleanEmail });
        

        if (userExists) {
          return res.status(409).json({ error: "User already exists." });
        } else {
          if (password.length < 6) {
            return res.status(409).json({ error: "Password should be at least 6 characters long!" });
          }
          if (!role) {
            return res.status(409).json({ error: "Please select a role for the user!" });
          }

          const hashedPassword = await hash(password, 12);

          User.create({
            fullName: cleanFullName,
            email: cleanEmail,
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
              } else {
                res.status(500).json({ error: "Internal server error." });
              }
            });
        }
      })
      .catch((error) => {
        res.status(401).json({ error: `An error occurred when creating user: ${error.message}` });
      })
    } else {
      res.status(405).json({ error: "Method not allowed!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export default handler;
