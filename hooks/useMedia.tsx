"use client";
import axios from "axios";
import { useState } from "react";
import { cloudinaryConfig } from "../utils/cloudinary.config";

const useMedia = () => {
  
  //// CREATE ////
  const [uploadingMedia, setUploadingMedia] = useState<boolean>(false);
  const uploadFile = async (file: any, folder?: string) => {
    try {
      const authUpload = await axios.post(`/api/media?folder=${folder || 'projects'}`);
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

  const uploadMedia = async (filesObject: any, folder?: string) => {
    if (filesObject) {
      try {
        setUploadingMedia(true);

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

        setUploadingMedia(false);

        return uploadedObject;

      } catch (error) {

        console.error("Error uploading files:", error);

        setUploadingMedia(false);
      }

    } else {
      return null;
    }
  };



  //// DELETE ////
  const [deletingMedia, setDeletingMedia] = useState(false);
  const deleteMedia = async (public_ids?: string[], folder?: string) => {
    if (!public_ids && !folder) {
      return { error: `Add at least one of "public_ids" or "folder" parameters!` }
    } else {
      if (public_ids?.length !== 0) {
        try {
          setDeletingMedia(true);
    
          const queryString = public_ids?.join(',');
          const response = await axios.delete(`/api/media?public_ids=${queryString}`);
    
          setDeletingMedia(false);
          return response.data;
        } catch (error: any) {
          console.error("Error deleting media:", error);
          setDeletingMedia(false);
          return { error: error.response.data.error };
        }
      } else {
        try {
          setDeletingMedia(true);
    
          const response = await axios.delete(`/api/media?folder=${folder}`);
    
          setDeletingMedia(false);
          return response.data;
        } catch (error: any) {
          console.error("Error deleting media:", error);
          setDeletingMedia(false);
          return { error: error.response.data.error };
        }
      }
    }
  };


  //// RELOCATE ////
  const [relocatingMedia, setRelocatingMedia] = useState<boolean>();
  const relocateMedia = async (old_folder: string, new_folder: string) => {
    try {
      setRelocatingMedia(true);

      const response = await axios.put(`/api/media?old_folder=${old_folder}&new_folder=${new_folder}`);

      setRelocatingMedia(false);
      return response.data;
    } catch (error: any) {
      setRelocatingMedia(false);

      const errorMessage = error.response?.data?.error;

      console.error('Error relocating folder:', errorMessage);
      throw new Error(`${errorMessage}`);
    }
  }




  return {
    // CREATE
    uploadMedia,
    uploadingMedia,

    // DELETE
    deleteMedia,
    deletingMedia,

    // UPDATE
    relocateMedia,
    relocatingMedia
  };
}

export default useMedia