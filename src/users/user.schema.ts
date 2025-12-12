// src/users/user.schema.ts

import { Schema, Document } from 'mongoose';
import { Role } from '../common/enums/role.enum';

export const UserSchema = new Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { 
      type: String, 
      required: true,
    },
    name: { 
      type: String, 
      required: true,
      trim: true,
    },
    role: { 
      type: String, 
      enum: Object.values(Role),
      default: Role.USER,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  },
);

// Interfaz para el tipo User
export interface User extends Document {
  email: string;
  password: string;
  name: string;
  role: Role;
  isActive: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}
