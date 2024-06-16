/* export const WEBSITE_URL =  process.env.NODE_ENV === "development" ?
                            "http://localhost:3000"
                            : process.env.NODE_ENV === "production" ?
                            process.env.WEBSITE_URL
                            : "" */

export const GRAPHQL_API_ENDPOINT = `${process.env.WEBSITE_URL}/api/graphql`;
export const AUTH_API_ENDPOINT = `${process.env.WEBSITE_URL}/api/auth`;