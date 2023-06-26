// Essentials
import axios from "axios";
const GRAPHQL_API_ENDPOINT = "https://viserionwick.vercel.app/api/graphql";

// Fetch Work Status
export const getSkills = async () => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
            query GetSkills {
                getSkills {
                    skillSet {
                        row1
                        row2
                        row3
                        row4
                    }
                }
            }
        `,
    });

    const skills = response.data.data.getSkills;    

    return skills;
  } catch (error) {
    console.error(error);
    return null;
  }
};