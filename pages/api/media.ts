// Essentials
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../../utils/cloudinary.config";
import { checkUserPermissions } from "../../utils/helpers/checkUser";

cloudinary.config(cloudinaryConfig);

const handler = async (req: any, res: any) => {
/*   if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  } */
  
  


  if (req.method === "POST") { // CREATE
    await checkUserPermissions(["createPost", "updatePost", "createSettings", "updateSettings"], req)
    .then(() => {
      const { folder } = req.query;
  
      const timestamp = Math.round(new Date().getTime() / 1000);
      const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder },
        cloudinaryConfig.api_secret
      );
  
      const data = { timestamp, signature };
  
      return res.status(200).json(data);
    })
    .catch((error: any) => {
      return res.status(401).json({ error: `An error occurred when uploading media: ${error.message}` });
    })

    
  } else if (req.method === "DELETE") { // DELETE
    const { public_ids, folder } = req.query;
    if (!public_ids && !folder) {
      return res.status(400).json({ error: 'Add at least one of "public_ids" or "folder" parameters!' });
    }

    await checkUserPermissions(["deletePost", "updatePost", "updateSettings"], req)
    .then(async () => {
      if (!folder) {
        const publicIdsArray = public_ids.split(',');

        if (publicIdsArray.length === 1) {
          cloudinary.uploader.destroy(public_ids, { invalidate: true }, (error, result) => {
            if (error) {
              return res.status(500).json({ error: `Failed to delete media: ${error.message}` });
            }
    
            let returnMessage = "";
            switch (result.result) {
              case "ok":
                returnMessage = "Media deleted successfully.";
                break;
              case "not found":
                returnMessage = "Error: Media not found.";
                break;
              default:
                returnMessage = "Unknown error.";
                break;
            }
    
            return res.status(200).json({ message: returnMessage, result });
          });
        } else if (publicIdsArray.length > 1) {
          const publicIdsArray = public_ids.split(',');
    
          cloudinary.api.delete_resources(publicIdsArray, { invalidate: true }, (error, result) => {
            if (error) {
              return res.status(500).json({ error: `Failed to delete media: ${error.message}` });
            }
    
            const deleted = result.deleted;
            const returnMessages = publicIdsArray.map((id: any) => {
              if (deleted[id] === 'deleted') {
                return { id, message: 'Media deleted successfully.' };
              } else if (deleted[id] === 'not_found') {
                return { id, message: 'Error: Media not found.' };
              } else {
                return { id, message: `Error: ${deleted[id]}` };
              }
            });
    
            return res.status(200).json({ messages: returnMessages, result });
          });
        }
      } else {
        const { resources } = await cloudinary.search.expression(`folder:${folder}`).execute();

        if (resources.length > 0) {
          const publicIdsArray = resources.map((resource: any) => resource.public_id);
          
          await cloudinary.api.delete_resources(publicIdsArray, { invalidate: true });
        }
        
        cloudinary.api.delete_folder(folder, (error: any, result: any) => {
          if (error) {
            return res.status(500).json({ error: `Failed to delete folder: ${error.message}` });
          }

          return res.status(200).json({ message: 'Folder deleted successfully', result });
        });
      }
    })
    .catch((error: any) => {
        return res.status(401).json({ error: `An error occurred when deleting media: ${error.message}` });
    }); 
    
    

  } else if (req.method === "PUT") { // RELOCATE
    const { old_folder, new_folder } = req.query;

    if (!old_folder || !new_folder) {
      return res.status(400).json({ error: 'Missing required parameters!' });
    }


    await checkUserPermissions(["deletePost", "updatePost", "updateSettings"], req)
    .then(async () => {
      try {
        // List all files in the old folder
        const { resources } = await cloudinary.search
          .expression(`folder:${old_folder}`)
          .execute();
    
        if (resources.length === 0) {
          return res.status(400).json({ error: 'Old folder is already empty or does not exist.' });
        }
    
        // Rename each file to the new folder
        const renamePromises = resources.map((file: any) => {
          const fileName = file.public_id.split('/').pop();
          const newPublicId = `${new_folder}/${fileName}`;
          return cloudinary.uploader.rename(file.public_id, newPublicId, { overwrite: true });
        });
    
        // Wait for all renaming operations to complete
        await Promise.all(renamePromises);
    
        // Delete the old folder
        await cloudinary.api.delete_folder(old_folder);
        
  
        return res.status(200).json({ message: 'Folder relocated successfully.' });
      } catch (error: any) {
        res.status(500).json({ error: `Failed to relocate folder: ${error.message}` });
      }
    })
    .catch((error: any) => {
      return res.status(401).json({ error: `An error occurred when deleting media: ${error.message}` });
    });   

  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
};

export default handler;