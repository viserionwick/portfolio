import gql from "graphql-tag";

export const settingsQueryDefs = `#graphql
  getSettings: Settings
`

export const settingsMutationDefs = `#graphql
  updateTechs(newTechs: [TechInput]): Settings
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

  type Tech {
    title: String
    logo: String
  }

  type Settings {
    work: Work
    socialMedia: [SocialMedia]
    heroDescription: String
    websiteDescription: String
    websiteName: String
    techs: [Tech]
  }  

  input TechInput {
    title: String
    logo: String
  }
`;