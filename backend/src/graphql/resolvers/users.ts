import { IResolvers } from '@graphql-tools/utils';
import { usersDataSource } from '../../data/usersdata';
import { Db } from 'mongodb';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user: any) => {
  const expiresAt = new Date(Date.now() + (15 * 60 * 1000));
  const token = jwt.sign({ userId: user._id, role: user.role, expiresAt }, JWT_SECRET);
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
    register: async (parent, { username, email, password }, context) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { username, email, password: hashedPassword, role: 'user',
          cart: { items: [], totalQuantity: 0, totalPrice: 0 }
        };

        await context.db.collection('users').insertOne(user);
        
        return "User registered successfully";

      } catch (error) {
        console.log(error);
        throw new Error('Failed to register user');
      }
    },
    login: async (parent, { email, password }, context) => {

      const user = await context.db.collection('users').findOne({email: email});
      if (!user) throw new Error('User not found');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid password');

      return generateToken(user);
    },
  },
}

export default usersResolvers;