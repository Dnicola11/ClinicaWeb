// src/config/mongoose.config.ts
import * as dotenv from 'dotenv';
dotenv.config(); // Cargar las variables de entorno

// Verificar si la variable de entorno está definida
// Soporta tanto MONGODB_URI como MONGO_URI para compatibilidad
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!uri) {
  // eslint-disable-next-line prettier/prettier
  throw new Error('La URI de MongoDB no está definida en las variables de entorno (MONGODB_URI o MONGO_URI)');
}

export const mongooseConfig = {
  uri: uri, // Usar la URI de las variables de entorno
};
