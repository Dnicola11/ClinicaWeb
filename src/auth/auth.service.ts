// src/auth/auth.service.ts

import { 
  Injectable, 
  UnauthorizedException, 
  BadRequestException,
  NotFoundException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Registro de usuario (solo ADMIN puede registrar)
  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const { password, ...result } = user.toObject();
    return result;
  }

  // Login
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { 
      email: user.email, 
      sub: user._id,
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    };
  }

  // Cambiar contraseña
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findByEmail(
      (await this.usersService.findById(userId)).email
    );

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword, 
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Contraseña actual incorrecta');
    }

    await this.usersService.updatePassword(userId, changePasswordDto.newPassword);

    return { message: 'Contraseña actualizada exitosamente' };
  }

  // Solicitar recuperación de contraseña
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);

    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return { 
        message: 'Si el email existe, recibirás instrucciones para resetear tu contraseña' 
      };
    }

    // Generar token de reseteo
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Token expira en 1 hora
    const expires = new Date(Date.now() + 3600000);

    await this.usersService.saveResetToken(user.email, hashedToken, expires);

    // En producción, aquí enviarías un email con el token
    // Por ahora, lo devolvemos en la respuesta (solo para desarrollo)
    return {
      message: 'Si el email existe, recibirás instrucciones para resetear tu contraseña',
      resetToken: resetToken, // SOLO PARA DESARROLLO - Eliminar en producción
    };
  }

  // Resetear contraseña con token
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetPasswordDto.token)
      .digest('hex');

    const user = await this.usersService.findByResetToken(hashedToken);

    if (!user) {
      throw new BadRequestException('Token inválido o expirado');
    }

    await this.usersService.updatePassword(user._id.toString(), resetPasswordDto.newPassword);
    await this.usersService.clearResetToken(user._id.toString());

    return { message: 'Contraseña reseteada exitosamente' };
  }

  // Validar usuario (usado por JWT strategy)
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }
}
