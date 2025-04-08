import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item, Response } from './item.type';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private http = inject(HttpClient);

  public findAll() {
    return this.http.get<Response<Item[]>>('http://localhost:8055/items/items');
  }

  public findOne(itemId: number) {
    return this.http.get<Response<Item>>(
      `http://localhost:8055/items/items/${itemId}`
    );
  }
}
