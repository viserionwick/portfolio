// Essentials
import axios from "axios";
const GRAPHQL_API_ENDPOINT = "https://viserionwick.vercel.app/api/graphql";

// Fetch One Project With Key
export const sendEmail = async (message: string, name: string, email: string) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
        query: `
            mutation SendEmail($message: String!, $name: String!, $email: String!) {
                sendEmail(input: { message: $message, name: $name, email: $email }) {
                message
                name
                email
                }
            }
        `,
        variables: {
            message,
            name,
            email,
        },
    });

    const contact = response.data.data.sendEmail;

    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
};