// Essentials
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import dbConnect from "../../../utils/dbConnect";

// Definitions
import { projectInputDefs, projectMutationDefs, projectQueryDefs, projectTypeDefs } from "./defs/project";
import { settingsQueryDefs, settingsTypeDefs } from "./defs/settings";
import { skillsQueryDefs, skillsTypeDefs } from "./defs/skills";
import { contactInputDefs, contactMutationDefs, contactTypeDefs } from "./defs/contact";

// Resolvers
import { projectMutationResolver, projectQueryResolver } from "./resolvers/project";
import { settingsQueryResolver } from "./resolvers/settings";
import { skillsQueryResolver } from "./resolvers/skills";
import { contactMutationResolver } from "./resolvers/contact";

const typeDefs = gql`
  ${projectTypeDefs}
  ${settingsTypeDefs}
  ${skillsTypeDefs}
  ${contactTypeDefs}

  ${projectInputDefs}
  ${contactInputDefs}

  type Query {
    ${projectQueryDefs}
    ${settingsQueryDefs}    
    ${skillsQueryDefs}    
  }

  type Mutation {
    ${projectMutationDefs}
    ${contactMutationDefs}
  }
`;

const resolvers = {
  Query: {
    ...projectQueryResolver,
    ...settingsQueryResolver,
    ...skillsQueryResolver
  },
  Mutation: {
    ...projectMutationResolver,
    ...contactMutationResolver,
  }
};


const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, db: await dbConnect() }),
});