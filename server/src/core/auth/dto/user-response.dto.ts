import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  profilePic: string | null;
  status: string;
  isPlatformAdmin: boolean;
  emailVerifiedAt: Date | null;
  twoFactorEnabled: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;

  /**
   * Factory: entity → DTO.
   * Note that `passwordHash` and `twoFactorSecret` are NOT copied.
   */
  static from(user: User): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = user.id;
    dto.email = user.email;
    dto.phoneNumber = user.phoneNumber;
    dto.firstName = user.firstName;
    dto.middleName = user.middleName;
    dto.lastName = user.lastName;
    dto.profilePic = user.profilePic;
    dto.status = user.status;
    dto.isPlatformAdmin = user.isPlatformAdmin;
    dto.emailVerifiedAt = user.emailVerifiedAt;
    dto.twoFactorEnabled = user.twoFactorEnabled;
    dto.lastLoginAt = user.lastLoginAt;
    dto.createdAt = user.createdAt;
    return dto;
  }
}
