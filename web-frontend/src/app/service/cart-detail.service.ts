import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CartDetail} from '../model/cart-detail';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {
  API_URL = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  saveCartDetail(username: string, cartDetail: CartDetail[]) {
    return this.http.post(this.API_URL + '/book/save-cart/' + username, cartDetail);
  }

  getHistory(username: string): Observable<History> {
    return this.http.get<History>(this.API_URL + '/book/history/' + username);
  }
}

