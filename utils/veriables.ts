export const WEBSITE_URL =  window.location.port ?
                            `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
                            :
                            `${window.location.protocol}//${window.location.hostname}`
                            ;

export const GRAPHQL_API_ENDPOINT = `${WEBSITE_URL}/api/graphql`;
export const AUTH_API_ENDPOINT = `${WEBSITE_URL}/api/auth`;