// Essentials
import axios from "axios";
const GRAPHQL_API_ENDPOINT = "http://localhost:3000/api/graphql";

// Fetch One Project With Key
export const getProject = async (slug: string) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
          query GetProject($slug: String!) {
            getProject(slug: $slug) {
              title
              desktopImages
              mobileImages
              dates {
                  start
                  end
              }
              stack {
                  title
                  logo
              }
              description {
                  text
                  webLink
                  repLink
              }
              tab1 {
                  title
                  text
              }
              tab2 {
                  title
                  text
              }
              tab3 {
                  title
                  text
              }
              slug
              createdAt
              updatedAt
              tags
            }
          }
        `,
      variables: {
        slug,
      },
    });

    const project = response.data.data.getProject;

    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch Spotlight Project
export const getSpotlightProject = async () => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
            query GetSpotlightProject {
              getSpotlightProject {
              title
              banner
              description {
                text
                webLink
                repLink
              }
              stack {
                  title
                  logo
              }
              slug
            }
          }
        `,
    });

    const project = response.data.data.getSpotlightProject;    

    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fetch Latest Projects
export const getProjects = async (limit: number, excludeSpotlight?: boolean, excludeSlug?: string, offset?: number) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
          query GetProjects($limit: Int!, $excludeSpotlight: Boolean, $excludeSlug: String, $offset: Int) {
            getProjects(limit: $limit, excludeSpotlight: $excludeSpotlight, excludeSlug: $excludeSlug, offset: $offset) {
              title
              banner
              stack {
                  title
                  logo
              }
              slug
              createdAt
              tags
            }
          }
        `,
      variables: {
        limit,
        excludeSpotlight,
        excludeSlug,
        offset
      },
    });

    const projects = response.data.data.getProjects;

    return projects;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Create A Project
/* export const createProject = async (limit: number) => {
  try {
    const response = await axios.post(`${process.env.GRAPHQL_API_ENDPOINT}`, {
      query: `
            query GetLatestProjects($limit: Int!) {
              getProjects(limit: $limit) {
                _id
                title
              }
            }
          `,
      variables: {
        limit,
      },
    });

    const projects = response.data.data.getProjects;

    return projects;
  } catch (error) {
    console.error(error);
    return [];
  }
}; */

/* 

mutation CreateProject($input: ProjectInput!) {
    createProject(input: $input) {
        title
        desktopImages
        mobileImages
        createdAt
        description {
            text
        }
        author {
            authorID
            authorName
        }
        _id
        slug
    }
}



{
  "input": {
    "title": "NEW Project3",
    "dates": {
        "start": "2023-05-22T12:00:00Z",
        "end": "2023-05-22T12:00:00Z"
    },
    "desktopImages": ["image1.jpg", "image2.jpg"],
    "mobileImages": ["image3.jpg", "image4.jpg"],
    "createdAt": "2023-05-22T12:00:00Z",
    "description": {
      "text": "This is a random project description."
    },
    "tab1": {
      "title": "tab 1",
      "text": "tab 1 text"
    },
    "tab2": {
      "title": "tab 2",
      "text": "tab 2 text"
    },
    "tab3": {
      "title": "tab 3",
      "text": "tab 3 text"
    },
    "author": {
      "authorID": "456",
      "authorName": "Jane Smith"
    },
    "slug": "new-project3"
  }
}
*/
