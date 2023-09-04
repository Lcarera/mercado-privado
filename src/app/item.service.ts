import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'https://api.mercadolibre.com/';

  constructor(private http: HttpClient) {}

  getItems(searchText: string) {
    return this.http.get<any[]>(
      `${this.apiUrl}sites/MLA/search?q=${searchText}&limit=5`
    );
  }

  getCategories(categoryId: string) {
    return this.http.get<any[]>(`${this.apiUrl}categories/${categoryId}`);
  }

  getItem(itemId: string) {
    return this.http.get<any[]>(`${this.apiUrl}items/${itemId}`);
  }

  getItemDescription(itemId: string) {
    return this.http.get<any[]>(`${this.apiUrl}items/${itemId}/description`);
  }

  formatPrice(price:string):string {
    return  formatNumber(Number(price), 'en-US', '1.0-0').replace(',', '.');
  }
}
