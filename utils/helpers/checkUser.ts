// Essentials
import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"

// Models
import Role from "../models/role"

const secret = process.env.NEXTAUTH_SECRET //////////////////////////////////////////////


// STATES


// CHECKING FUNCTIONS
export const hasToken = async (req: NextApiRequest) => {
  const token = await getToken({ req, secret })
  if (!token){
    return false
  } else {
    return true
  }
}

export const checkCurrentUserRole = async (req: NextApiRequest) => {
  const token = await getToken({ req, secret }) as any;
  if (!token){
    return false
  } else {
    return token.user.role
  }
}

export const checkUserPermissions = async (
  requiredPermissions: string[],
  req: NextApiRequest,
  checkAny: boolean | string = false
): Promise<boolean> => {
  const role = await Role.findOne({ roleName: await checkCurrentUserRole(req) });
  
  if (role) {
    const isAuthorized: boolean = checkAny === true || checkAny === "true"
      ? requiredPermissions.some((targetedString: string) => role.rolePermissions.includes(targetedString)) // Check if ANY given permission passes
      : requiredPermissions.every((targetedString: string) => role.rolePermissions.includes(targetedString)); // Check if ALL given permissions passes

    if (isAuthorized) {        
      return true; // Authorized.
    } else {
      throw new Error("Not authorized.")
    }

  } else {
    throw new Error("Not authorized.")
  }
};