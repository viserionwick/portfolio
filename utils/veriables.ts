export const WEBSITE_URL =  process.env.NODE_ENV === "development" ?
                            "http://localhost:3000"
                            : process.env.NODE_ENV === "production" ?
                            ""
                            : ""

export const GRAPHQL_API_ENDPOINT = `${WEBSITE_URL}/api/graphql`;
export const AUTH_API_ENDPOINT = `${WEBSITE_URL}/api/auth`;