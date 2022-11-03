import {CartDetail} from './cart-detail';
import {AppUser} from './app-user';

export interface Cart {
  id?: number;
  createDate?: string;
  createTime?: string;
  status?: boolean;
  appUser?: AppUser;
  cartDetails?: CartDetail[];
}
