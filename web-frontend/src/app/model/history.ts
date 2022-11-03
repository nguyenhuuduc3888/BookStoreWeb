import {Cart} from './cart';

export interface History {
  id?: number;
  address?: string;
  name?: string;
  phone?: string;
  cartList?: Cart[];
}
