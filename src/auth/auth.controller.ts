// src/auth/auth.controller.ts

import { 
  Controller, 
  Post, 
  Put, 
  Body, 
  UseGuards,
  Request 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Registro de usuario - Solo ADMIN puede registrar nuevos usuarios
  // TEMPORALMENTE SIN GUARD PARA CREAR EL PRIMER ADMIN
  @Post('register')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Login - Público
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Cambiar contraseña - Usuario autenticado
  @Put('change-password')
  // @UseGuards(JwtAuthGuard) // Temporalmente deshabilitado
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto & { userId: string },
  ) {
    return this.authService.changePassword(changePasswordDto.userId, changePasswordDto);
  }

  // Solicitar recuperación de contraseña - Público
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  // Resetear contraseña con token - Público
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  // Obtener perfil del usuario autenticado
  @Post('profile')
  // @UseGuards(JwtAuthGuard) // Temporalmente deshabilitado
  async getProfile(@Body() body: { userId: string }) {
    return { message: 'Autenticación temporalmente deshabilitada', userId: body.userId };
  }
}
