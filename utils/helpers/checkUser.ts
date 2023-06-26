import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"
import Role from "../models/role"

const secret = process.env.NEXTAUTH_SECRET

// CHECKING FUNCTIONS
export const hasToken = async (req: NextApiRequest) => {
  const token = await getToken({ req, secret })
  if (!token){
    return false
  } else {
    return true
  }
}

export const checkUserRole = async (req: NextApiRequest) => {
  const token = await getToken({ req, secret }) as any;
  if (!token){
    return false
  } else {
    return token.user.role
  }
}

export const checkUserPermissions = (requiredPermissions: string[]) => async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {

  await Role.findOne({ roleName: await checkUserRole(req) })
  .then((role) => {
    if (role) {
      const allStringsExist: boolean = requiredPermissions.every((targetedString: string) => role.rolePermissions.includes(targetedString));

      if (allStringsExist) {
        next();
      } else {
        return res.status(401).json({ error: "Not Authorized" });
      }
    } else {
        return res.status(401).json({ error: "Not Authorized" });
    }
  })
  .catch(() => {
      return res.status(409).json({ error: "An Error Occured When Checking For Permission" });
  })  
};
