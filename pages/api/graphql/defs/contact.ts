import gql from "graphql-tag";

export const contactMutationDefs = `#graphql
  sendEmail(input: ContactInput): Contact
`

export const contactTypeDefs = gql`
  type Contact {
    message: String
    name: String
    email: String
  }
`

export const contactInputDefs = gql`
  input ContactInput {
    message: String!
    name: String!
    email: String!
  }
`;