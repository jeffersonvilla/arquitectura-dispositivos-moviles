import dotenv from 'dotenv';
dotenv.config();

/**
 * Configuración para conectarse a mongodb
 */
const config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URI ,
    dbName: process.env.DB_NAME
}

export default config;