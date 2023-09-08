import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private myApiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getItems(searchText: string) {
    return this.http.get<any[]>(
      `${this.myApiUrl}items?q=${searchText}`
    );
  }
  
  getItem(itemId: string) {
    return this.http.get<any[]>(`${this.myApiUrl}items/${itemId}`);
  }

  formatPrice(price:string):string {
    const formattedPrice = formatNumber(Number(price), 'en-US', '1.0-0');
    return formattedPrice.replace(/,/g, '.');
  }
}
