// Essentials
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { GraphQLError } from 'graphql';
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import dbConnect from "../../../utils/dbConnect";

// Rate Limit
import { makeExecutableSchema } from "@graphql-tools/schema";
import { rateLimitDirective } from "graphql-rate-limit-directive";

// Definitions
import { projectInputDefs, projectMutationDefs, projectQueryDefs, projectTypeDefs } from "./defs/project";
import { settingsMutationDefs, settingsQueryDefs, settingsTypeDefs } from "./defs/settings";
import { skillsQueryDefs, skillsTypeDefs } from "./defs/skills";
import { contactInputDefs, contactMutationDefs, contactTypeDefs } from "./defs/contact";

// Resolvers
import { projectMutationResolver, projectQueryResolver } from "./resolvers/project";
import { settingsMutationResolver, settingsQueryResolver } from "./resolvers/settings";
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
    ${settingsMutationDefs}
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
    ...settingsMutationResolver,
    ...contactMutationResolver,
  }
};



const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();
let schema = makeExecutableSchema({
  typeDefs: [
    rateLimitDirectiveTypeDefs,
    typeDefs,
  ],
  resolvers,
});
schema = rateLimitDirectiveTransformer(schema);



const apolloServer = new ApolloServer({
  /* schema, */
  typeDefs,
  resolvers,
  formatError: (formatError, error: any) => {
    if (error.originalError instanceof GraphQLError) {
      // Handle GraphQLError here
      console.error('Caught GraphQLError:', error.message);

      // You can customize the error response sent to the client
      return {
        message: error.message,
        code: error.extensions.code || 'INTERNAL_SERVER_ERROR',
        argumentName: error.extensions.argumentName,
      };
    } else {
      // Handle other errors here
      console.error('Caught non-GraphQLError:', error.message);

      // You can customize the error response sent to the client
      return {
        message: 'Internal Server Error',
        code: 'INTERNAL_SERVER_ERROR',
      };
    }
  },
  introspection: true,
  plugins: [ApolloServerPluginLandingPageDisabled()]
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async ( req: NextApiRequest, res: NextApiResponse ) => ({ req, res, db: await dbConnect() })
});