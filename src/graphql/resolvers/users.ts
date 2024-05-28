import { IResolvers } from '@graphql-tools/utils';
import { usersDataSource } from '../../data/usersdata';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: any) => {
  const expiresAt = new Date(Date.now() + (15 * 60 * 1000)); 
  const token = jwt.sign({ userId: user.id, role: user.role, expiresAt }, JWT_SECRET);
  return token;
};

const usersResolvers: IResolvers = {
    Query: {
        user: (parent, args, context) => {
          if (!context.user) throw new Error('Not authenticated');
          return context.user;
        },
      },
      Mutation: {
        register: async (parent, { username, email, password }) => {
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = { id: String(usersDataSource.length + 1) , username, email, 
              password: hashedPassword , token: '', role: 'user'};
          usersDataSource.push(user);
          const token = jwt.sign({ userId: user.id }, JWT_SECRET);
          user.token = token;
          return user;
        },
        login: async (parent, { email, password }) => {
          const user = usersDataSource.find(user => user.email === email);
          if (!user) throw new Error('User not found');
    
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) throw new Error('Invalid password');

          user.token = generateToken(user);
          return user;
        },
        logout: async (parent, args, context) => {
          if(!context.user) throw new Error('Not authenticated');

          context.user.token = '';

          return true;
        },
      },
}



export default usersResolvers;