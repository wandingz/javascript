import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';

import { AuthService } from '../auth/auth.service';

export class Product {
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;
  price: number;
  starRating: number;
  imageUrl: string;
  [x: string]: any;
}


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient: HttpClient, private _authService: AuthService) { }

  getProductsByCode(productCode: string): Observable<any> {
    return this._httpClient.get('http://localhost:3000/getProduct/' + productCode, {
      // withCredentials: true,
    }).map(data => data[0]);
  }

  getProducts(): Observable<any> {
    var token = this._authService.$authStatus.value.token;
    return this._httpClient.get('http://localhost:3000/getProducts', {
      // headers: new HttpHeaders().set('authorization', token),
      // withCredentials: true,
    });
  }
}
