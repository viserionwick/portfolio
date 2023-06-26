import gql from "graphql-tag";

export const skillsQueryDefs = `#graphql
  getSkills: Skills
`

export const skillsTypeDefs = gql`
  type SkillSet {
    row1: [String]
    row2: [String]
    row3: [String]
    row4: [String]
  }

  type Skills {
    skillSet: SkillSet
  }
`;
