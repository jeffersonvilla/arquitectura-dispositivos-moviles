import express, { Application } from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { usersDataSource } from "./data/usersdata";
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express() as any;
app.use(cors());


const JWT_SECRET = process.env.JWT_SECRET;

const contextMiddleware = ({ req }: any) => {
  const authorization = req.headers.authorization || '';


  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    try {

      const token = authorization.split(' ')[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      const now = new Date();
      const expiresAt = new Date(decoded.expiresAt);

      if (now > expiresAt) {
        throw new Error('Your session has expired. Sign in again.');
      }

      const user = usersDataSource.find(user => user.id === decoded.userId);
      return { user };
    } catch (e) {
      throw new Error('Session expired. Sign in again.');
    }
  }
  return {};
};

const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
  context: contextMiddleware
});

server.start().then(res => {
  server.applyMiddleware({ app });


  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
  });

})
