import { UserDto } from '../../dto/users/usersDto';
import { UserCurrentDto } from '../../dto/users/usersCurrentDto';

export interface IUsersService {
  registerUser(
    username: string,
    email: string,
    password: string
  ): Promise<void>;
  loginUser(
    email: string,
    password: string
  ): Promise<{ user: UserDto; token: string }>;
  getAllUsers(
    page: number,
    pageSize: number
  ): Promise<{ users: UserCurrentDto[]; totalCount: number }>;
  updateUserRole(userId: string, newRoleId: string): Promise<void>;
  getCurrentUser(userId: string): Promise<UserDto>;
  getTotalCount(): Promise<number>;
}
