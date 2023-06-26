import gql from "graphql-tag";

export const projectQueryDefs = `#graphql
  getProjects(limit: Int!, excludeSpotlight: Boolean, excludeSlug: String, offset: Int): [Project]
  getProject(slug: String!): Project
  getSpotlightProject: Project
`

export const projectMutationDefs = `#graphql
  createProject(input: ProjectInput): Project
`

export const projectTypeDefs = gql`
  type Dates {
    start: String
    end: String
  }

  type Stack {
    title: String
    logo: String
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
  }

  type Project {
    _id: ID
    slug: String
    dates: Dates
    title: String
    stack: [Stack]
    description: Description
    tab1: Tab
    tab2: Tab
    tab3: Tab
    banner: String
    desktopImages: [String]
    mobileImages: [String]
    author: Author
    createdAt: String
    updatedAt: String
    tags: [String]
    spotlight: Boolean
  }
`;

export const projectInputDefs = gql`
  input DatesInput {
    start: String!
    end: String!
  }

  input StackInput {
    title: String!
    logo: String!
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
  }

  input ProjectInput {
    slug: String!
    dates: DatesInput!
    title: String!
    stack: [StackInput]
    description: DescriptionInput
    tab1: TabInput!
    tab2: TabInput!
    tab3: TabInput!
    banner: String!
    desktopImages: [String!]
    mobileImages: [String!]
    author: AuthorInput!
    createdAt: String!
    updatedAt: String
    tags: [String]
    spotlight: Boolean!
  }
`;