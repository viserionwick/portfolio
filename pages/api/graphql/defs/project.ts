import gql from "graphql-tag";

export const projectQueryDefs = `#graphql
  getProjects(limit: Int!, excludeSpotlight: Boolean, excludeSlug: String, offset: Int): [Project]
  getProject(slug: String!): Project
  getSpotlightProject: Project
`

export const projectMutationDefs = `#graphql
  createProject(input: ProjectInput): Project
  updateProject(input: ProjectInput): Project
  deleteProject(projectID: String!): DeleteProjectResponse!
`

export const projectTypeDefs = gql`
  type Dates {
    start: String
    end: String
  }

  type Description {
    text: String
    webLink: String
    repLink: String
  }

  type Tab {
    title: String
    text: String
  }

  type Author {
    authorID: String
    authorName: String
    authorUsername: String
  }

  type UpdatedTime {
    updatedAt: String
    authorID: String
    authorUsername: String
    authorRoleAtTheTime: String
  }

  type Project  {
    _id: ID
    slug: String
    dates: Dates
    title: String
    stack: [String]
    description: Description
    tab1: Tab
    tab2: Tab
    tab3: Tab
    banner: String
    desktopImages: [String]
    mobileImages: [String]
    author: Author
    createdAt: String
    updatedTimes: [UpdatedTime]
    tags: [String]
    spotlight: Boolean
  }


  type DeleteProjectResponse {
    success: Boolean!
    message: String!
  }
`;

export const projectInputDefs = gql`
  input DatesInput {
    start: String!
    end: String!
  }

  input DescriptionInput {
    text: String!
    webLink: String
    repLink: String
  }

  input TabInput {
    title: String!
    text: String!
  }

  input AuthorInput {
    authorID: String!
    authorName: String!
    authorUsername: String!
  }

  input UpdatedTimeInput {
    updatedAt: String!
    authorID: String!
    authorUsername: String!
    authorRoleAtTheTime: String!
  }

  input ProjectInput {
    _id: ID
    slug: String!
    dates: DatesInput
    title: String!
    stack: [String]
    description: DescriptionInput
    tab1: TabInput
    tab2: TabInput
    tab3: TabInput
    banner: String!
    desktopImages: [String!]
    mobileImages: [String!]
    author: AuthorInput!
    createdAt: String!
    updatedTimes: [UpdatedTimeInput]
    tags: [String]
    spotlight: Boolean!
  }
`;