// Essentials
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../../../utils/cloudinary.config";
import { checkUserPermissions } from "../../../utils/helpers/checkUser";

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

const handler = async (req: any, res: any) => {
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "Method not allowed." });
    }

    const { public_id } = req.query;
    if (!public_id) {
        return res.status(400).json({ error: "Missing public_id parameter." });
    }    
    
    await checkUserPermissions(["deletePost", "updatePost", "updateSettings"], req)
    .then(() => {
        cloudinary.uploader.destroy(public_id, { invalidate: true }, (error, result) => {
            if (error) {
                return res.status(500).json({ error: `Failed to delete media: ${error.message}` });
            }

            let returnMessage: string = "";
            switch (result.result) {
                case "ok":
                    returnMessage = "Media deleted successfully."
                    break;

                case "not found":
                    returnMessage = "Error: Media not found."
                    break;
            
                default:
                    break;
            }

            return res.status(200).json({ message: returnMessage, result });
        });
    })
    .catch((error) => {
        return res.status(401).json({ error: `An error occurred when deleting media: ${error.message}` });
    });
   
};

export default handler;
