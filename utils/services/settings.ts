// Essentials
import axios from "axios";
import { GRAPHQL_API_ENDPOINT } from "../veriables";

// Types
import { TechType } from "../models/settings";


// Fetch All Settings
export const getSettings = async (settingsToGet?: string) => {
  console.log(GRAPHQL_API_ENDPOINT);
  

  if (settingsToGet) {
    try {
      const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
        query: `
              query GetSettings {
                  getSettings {
                    ${settingsToGet}
                }
              }
          `,
      });
  
      const settings = response.data.data.getSettings;    
  
      return settings;
    } catch (error) {
      console.error("Settings GraphQL Error: " + error);
      return null;
    }
  } else {
    try {
      const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
        query: `
              query GetSettings {
                  getSettings {
                    work {
                      status
                      position
                      companyName
                      companyURL
                    }
                    socialMedia {
                      name
                      href
                      icon
                    }
                    heroDescription
                    websiteDescription
                    websiteName
                    techs {
                      title
                      logo
                    }
                }
              }
          `,
      });
  
      const settings = response.data.data.getSettings;    
  
      return settings;
    } catch (error) {
      console.error("Settings GraphQL Error: " + error);
      return null;
    }
  }
  
};

// Update Techs
export const updateTechs = async (newTechs: [TechType]) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
        mutation UpdateTechs($newTechs: [TechInput]) {
          updateTechs(newTechs: $newTechs) {
            techs {
              title
              logo
            }
          }
        }
      `,
      variables: {
        newTechs,
      },
    });

    /* const updatedSettings = response.data.data.updateTechs;

    return updatedSettings; */

    const updatedSettings = response.data.data.updateTechs;
    const errors = response.data.errors;

    if (errors && errors.length >= 1) {
      throw new Error(errors[0].message)
    } else {
      return updatedSettings;
    }   
  } catch (error: any) {
    /* console.error("Update Techs GraphQL Error: " + error);
    return null; */
    console.error(error.message);
    throw error;   
  }
};