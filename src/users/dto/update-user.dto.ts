// src/users/dto/update-user.dto.ts

import { Role } from '../../common/enums/role.enum';

export class UpdateUserDto {
  email?: string;
  name?: string;
  role?: Role;
  isActive?: boolean;
}
