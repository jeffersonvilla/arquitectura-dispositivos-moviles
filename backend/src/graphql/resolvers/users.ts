import { IResolvers } from '@graphql-tools/utils';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//String de 256 caracteres para generar y verificar tokens JWT
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Genera token JWT firmado con el id del usuario, su rol(admin, user), y la fecha de expiración
 * Se usa el JWT_SECRET para firmar el token
 * 
 * Expiración en 15 minutos desde la fecha de creación del token
 */
const generateToken = (user: any) => {
  const expiresAt = new Date(Date.now() + (15 * 60 * 1000));
  const token = jwt.sign({ userId: user._id, role: user.role, expiresAt }, JWT_SECRET);
  return token;
};

/**
 * Resolvers para los queries y mutaciones relacionados con los users
 */
const usersResolvers: IResolvers = {
  Query: {
    /**
     * Retorna la información del usuario solo si está autenticado
     */
    user: (parent, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      return context.user;
    },
  },
  Mutation: {
    /**
     * Registra un nuevo usuario en la base de datos
     * Encripta la contraseña usando bcrypt antes de registrar el usuario
     * Todos los usuarios tienen un carrito de compra sin items por default
     * 
     * Se debe usar sin autenticar
     */
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
    /**
     * Verifica la existencia del usuario por medio del email recibido
     * Si el usuario existe, se valida la contraseña recibida con bcrypt
     * Si la contraseña en correcta se genera un nuevo token JWT
     * 
     * Se debe usar sin authenticar
     */
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