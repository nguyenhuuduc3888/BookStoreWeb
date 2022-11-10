import {Category} from './category';

export interface Book {
  id?: number;
  codeBook?: string;
  bookName?: string;
  price?: number;
  author?: string;
  image?: string;
  totalPages?: number;
  size?: string;
  publicationCompany?: string;
  introduce?: string;
  releaseDate?: string;
  category?: Category;
  sumQuantity?: number;
  name?: string;
}
