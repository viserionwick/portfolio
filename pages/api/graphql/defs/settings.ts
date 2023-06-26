import gql from "graphql-tag";

export const settingsQueryDefs = `#graphql
  getSettings: Settings
`

export const settingsTypeDefs = gql`
  type Work {
    status: Boolean
    position: String
    companyName: String
    companyURL: String
  }

  type SocialMedia {
    name: String
    href: String
    icon: String
  }

  type Settings {
    work: Work
    socialMedia: [SocialMedia]
    heroDescription: String
    websiteDescription: String
    websiteName: String
  }
`;
