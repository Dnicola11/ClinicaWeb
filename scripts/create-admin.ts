// scripts/create-admin.ts
// Script para crear el primer usuario administrador

import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const User = mongoose.model('User', UserSchema);

async function createAdmin() {
  try {
    // Conectar a MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://obertynunezobi_db_user:OJTzY3sOGI15puyx@clinicaapp.o29zfin.mongodb.net/clinicaapp';
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado a MongoDB');

    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ email: 'admin@clinica.com' });
    if (existingAdmin) {
      console.log('⚠️  Ya existe un usuario admin con este email');
      process.exit(0);
    }

    // Crear el usuario admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      email: 'admin@clinica.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
      isActive: true,
    });

    await admin.save();
    console.log('✅ Usuario administrador creado exitosamente');
    console.log('📧 Email: admin@clinica.com');
    console.log('🔑 Password: admin123');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear el administrador:', error);
    process.exit(1);
  }
}

createAdmin();
