// Essentials
import axios from "axios";
import { IProject } from "../models/project";
import { GRAPHQL_API_ENDPOINT } from "../veriables";

// Fetch One Project With Key
export const getProject = async (slug: string) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
          query GetProject($slug: String!) {
            getProject(slug: $slug) {
              _id
              slug
              dates {
                start
                end
              }
              title
              stack
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
              banner
              desktopImages
              mobileImages
              author {
                authorID
                authorName
                authorUsername
              }
              createdAt
              updatedTimes {
                updatedAt
                authorID
                authorUsername
                authorRoleAtTheTime
              }
              tags
              spotlight
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
              stack
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
              stack
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
export const createProject = async (input: IProject) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
        mutation CreateProject($input: ProjectInput!) {
          createProject(input: $input) {
            title
            slug
          }
        }
      `,
      variables: {
        input
      },
    });

    const createdProject = response.data.data.createProject;
    const errors = response.data.errors;

    if (errors && errors.length >= 1) {
      throw new Error(errors[0].message)
    } else {
      return createdProject;
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};


// Update A Project
export const updateProject = async (input: IProject) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
        mutation UpdateProject($input: ProjectInput!) {
          updateProject(input: $input) {
            title
            slug
          }
        }
      `,
      variables: {
        input
      },
    });

    const updatedProject = response.data.data.updateProject;
    const errors = response.data.errors;

    if (errors && errors.length >= 1) {
      throw new Error(errors[0].message)
    } else {
      return updatedProject;
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};


// Delete A Project
export const deleteProject = async (projectID: string) => {
  try {
    const response = await axios.post(`${GRAPHQL_API_ENDPOINT}`, {
      query: `
        mutation DeleteProject($projectID: String!) {
          deleteProject(projectID: $projectID) {
            success
            message
          }
        }
      `,
      variables: {
        projectID
      },
    });

    if (response.data.errors && response.data.errors.length >= 1) {
      throw new Error(response.data.errors[0].message);
    } else {
      return response.data.data.deleteProject;
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};