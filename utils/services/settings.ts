// Essentials
import axios from "axios";
const GRAPHQL_API_ENDPOINT = "http://localhost:3000/api/graphql";

// Fetch Work Status
export const getSettings = async () => {
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
              }
            }
        `,
    });

    const settings = response.data.data.getSettings;    

    return settings;
  } catch (error) {
    console.error(error);
    return null;
  }
};