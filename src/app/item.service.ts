import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

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
}
