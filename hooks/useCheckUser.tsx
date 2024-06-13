"use client";
import axios, { AxiosRequestConfig } from "axios";

const useCheckUser = () => {   
   
  const isAuthorizedTo = async (permissions: string[], checkAny: boolean = false) => {
    try {
      const config: AxiosRequestConfig = {
        params: {
          permissions: permissions.join(','),
          checkAny,
        },
      };

      await axios.get("/api/auth/checkUser", config);
      
      return true;
      
    } catch (error: any) {
      throw error;
    }
  };

  return {
    isAuthorizedTo
  };
}

export default useCheckUser