import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact} from '../model/contact';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) {
  }

  getList(page: number, size: number): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(API_URL + '/contact/page?page=' + page + '&size=' + size);
  }

  delete(id: number): Observable<Contact> {
    return this.httpClient.delete<Contact>(`${API_URL}/contact/delete/${id}`);
  }

  save(contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${API_URL}/contact/create`, contact);
  }

  finById(id: number): Observable<Contact> {
    return this.httpClient.get<Contact>(`${API_URL}/contact/detail/${id}`);
  }
}
