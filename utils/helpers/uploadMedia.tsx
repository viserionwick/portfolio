import axios from "axios";
import { cloudinaryConfig } from "../../utils/cloudinary.config";

export const uploadMedia = async (filesObject: any, folder?: string) => {

    const uploadFile = async (file: any, folder?: string) => {
        try {
          const authUpload = await axios.get(`/api/auth/uploadMedia?folder=${folder || 'projects'}`);
          if (authUpload.status === 200) {
            const { timestamp, signature } = authUpload.data;
    
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", cloudinaryConfig.api_key);
            formData.append("signature", signature);
            formData.append("timestamp", String(timestamp));
            folder && formData.append("folder", folder);
    
            const response = await axios.post(
              cloudinaryConfig.upload_url,
              formData
            );
            
            const data = response.data;
    
            return data;
          }             
        } catch (error: any) {
    
          console.error(error.response.data.error);
          return {};
        }
      };


    if (filesObject) {
      try {

        const uploadFilePromises = Object.entries(filesObject).map(
          async ([key, value]) => {
            if (Array.isArray(value)) {
              const uploadedArray = await Promise.all(
                value.map((file) => uploadFile(file, folder))
              );
              return [key, uploadedArray];
            } else {
              const uploadedValue = await uploadFile(value, folder);
              return [key, uploadedValue];
            }
          }
        );

        const uploadedEntries = await Promise.all(uploadFilePromises);
        const uploadedObject = Object.fromEntries(uploadedEntries);

        return uploadedObject;

      } catch (error) {

        console.error("Error uploading files:", error);
      }

    } else {
      return null;
    }
  };