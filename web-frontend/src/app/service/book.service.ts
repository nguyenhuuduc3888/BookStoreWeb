import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {Category} from '../model/category';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
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

  update(id: number, book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${API_URL}/book/update/${id}`, book);
  }

  detailBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(`${API_URL}/book/detail/${id}`);
  }

  deleteBook(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(`${API_URL}/book/delete/${id}`);
  }
}
