import {GraphQLSchema} from 'graphql';
import 'graphql-import-node';
import { makeExecutableSchema } from 'graphql-tools';
import usersSchema from './schemas/users.graphql';
import shoppingSchema from './schemas/shopping.graphql';
import shoppingResolver from './resolvers/shopping';
import usersResolver from './resolvers/users';
import mergeTypeDefs from 'graphql-tools-merge-typedefs';

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([usersSchema, shoppingSchema]),
    resolvers: [usersResolver, shoppingResolver]
});