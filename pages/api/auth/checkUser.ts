// Essentials
import { checkUserPermissions } from "../../../utils/helpers/checkUser";

const handler = async (req: any, res: any) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }
  
  const { permissions, checkAny } = req.query;

  // Convert comma-separated string to an array
  const permissionsArray = typeof permissions === 'string' ? permissions.split(',') : [];  
  
  await checkUserPermissions(permissionsArray, req, checkAny)
  .then(() => {
    return res.status(200).json(true);
  })
  .catch((error) => {
    return res.status(401).json({ error: `User permission for this action: ${error.message}` });
  })
};

export default handler;