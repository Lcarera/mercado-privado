import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'https://api.mercadolibre.com/sites/MLA/';

  constructor(private http: HttpClient) { }

  getItems(searchText: string) {
      console.log(`${this.apiUrl}search?q=${searchText}`);
      return this.http.get<any[]>(`${this.apiUrl}search?q=${searchText}&limit=5`);
  }
}