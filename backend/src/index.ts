import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import MongoLib from "./mongo";
import { Db, ObjectId } from "mongodb";
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express() as any;
app.use(cors());

//String de 256 caracteres para generar y verificar tokens JWT
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Crea un usuario por default en la base de datos
 * con rol de administrador 
 */
const initializeAdminInDb = async (db: Db) => {

  try {

    const adminUser = await db.collection('users').findOne({ email: 'admin@correo' });

    if (!adminUser) {
      const admin = {
        username: 'admin',
        email: 'admin@correo',
        password: '$2a$10$FzHHR9aVCQk6lpI9ibA5POYmexzSvmDShPeEVJZsPDNlHFm0HjczK',//la contraseña es 'password' 
        role: 'admin',
        cart: {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
      };

      await db.collection('users').insertOne(admin);
      console.log('Admin user created');
    } 
  } catch (error) {
    console.error('Error initializing database:', error);
  } 
};

/**
 * Middleware usado para validar el token JWT recibido del frontend
 * 
 * Para permitir o impedir el acceso a las diferentes 
 * funcionalidades segun el rol del usuario
 * 
 * Tambien es sirve para iniciar la conexion a mongodb
 * 
 * Retorna el usuario (si el token JWT es valido) y la conexion a mondodb
 */
const contextMiddleware = async ({ req }: any) => {
  const authorization = req.headers.authorization || '';

  const mongodb = await new MongoLib().connect();

  await initializeAdminInDb(mongodb);

  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    try {

      const token = authorization.split(' ')[1];

      const decoded = jwt.verify(token, JWT_SECRET);

      const now = new Date();
      const expiresAt = new Date(decoded.expiresAt);

      if (now > expiresAt) {
        throw new Error('Your session has expired. Sign in again.');
      }

      const user = await mongodb.collection('users').findOne({_id: new ObjectId(decoded.userId)});
      
      return { user:user, db: mongodb };
    } catch (e) {
      throw new Error('Session expired. Sign in again.');
    }
  }

  return {db: mongodb};
};

const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground()
  ],
  context: contextMiddleware,
});

/**
 * Inicia el servidor backend en el puerto 4000 
 */
server.start().then(res => {
  server.applyMiddleware({ app });


  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
  });

})
