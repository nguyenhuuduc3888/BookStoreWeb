import {UserRole} from './user-role';

export interface AppUser {
  id?: number;
  username?: string;
  password?: string;
  name: string;
  email?: string;
  address: string;
  phone: string;
  userRoles?: UserRole;
}
