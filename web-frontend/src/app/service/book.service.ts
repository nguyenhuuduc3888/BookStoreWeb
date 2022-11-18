import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from '../model/book';
import {Category} from '../model/category';
import {AppUser} from '../model/app-user';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

// những dữ liệu sẻ được gởi đi
  private data = new BehaviorSubject({
    totalQuantity: 0
  });
  // nhận dữ lieu từ component khác
  getData = this.data.asObservable();

  // lấy dữ liệu từ component hiện tại
  changeData(data: any) {
    this.data.next(data);
  }

  findUserName(name: string): Observable<any> {
    return this.httpClient.get<any>(API_URL + '/book/user-detail/' + name);
  }

  getListCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${API_URL}/book/category`);
  }

  getListAndSearch(page: number, categorySearch: string, authorSearch: string, nameSearch: string, size: number): Observable<Book[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Book[]>(API_URL + `/book/page?page=` + page + `&keySearch=` + categorySearch + `&keySearch1=` + authorSearch + `&keySearch2=` + nameSearch + `&size=` + size);
  }

  save(book): Observable<Book> {
    return this.httpClient.post<Book>(`${API_URL}/book/create`, book);
  }

  saveFacebook(user): Observable<AppUser> {
    return this.httpClient.post<AppUser>(`${API_URL}/book/facebook`, user);
  }

  update(id: number, book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${API_URL}/book/update/${id}`, book);
  }

  detailBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${API_URL}/book/detail/${id}`);
  }

  deleteBook(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(`${API_URL}/book/delete/${id}`);
  }

  getCart() {
    const cartJson = sessionStorage.getItem('cart');
    if (cartJson) {
      return JSON.parse(cartJson);
    } else {
      return [];
    }
  }

  saveCart(cart: any) {
    const cartJson = JSON.stringify(cart);
    sessionStorage.setItem('cart', cartJson);
  }

  getCartTotalQuantity() {
    const cart = this.getCart();
    let total = 0;
    cart.forEach((item: any) => {
      total += item.quantity;
    });
    return total;
  }

  getCartTotalMany() {
    const cart = this.getCart();
    let total = 0;
    cart.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  getListSellingTop10(startDate: string, endDate: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + `/book/statistic/` + startDate + '/' + endDate);
  }

  getListBookTop(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL + `/book/top`);
  }
}
