const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");
const express = require("express");
const http = require("http");

// GraphQL schema and resolvers.
const { typeDefs, resolvers } = require("./src/graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const db = require("./src/database/index");
db.sync();

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({ app });

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4009 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4009${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
