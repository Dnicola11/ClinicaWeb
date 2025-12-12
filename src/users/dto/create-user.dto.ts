// src/users/dto/create-user.dto.ts

import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: Role;
}
