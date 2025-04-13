import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, ItemCreatePayload, ItemUpdatePayload } from './item.type';
import { ApiResponse } from '../app.type';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(payload: ItemCreatePayload) {
    return this.httpClient.post<ApiResponse<Item>>(
      'http://localhost:8055/items/items',
      payload
    );
  }

  public findAll() {
    return this.httpClient.get<ApiResponse<Item[]>>(
      'http://localhost:8055/items/items'
    );
  }

  public findOne(itemId: number) {
    return this.httpClient.get<ApiResponse<Item>>(
      `http://localhost:8055/items/items/${itemId}`
    );
  }

  public update(itemId: number, payload: ItemUpdatePayload) {
    return this.httpClient.patch<ApiResponse<Item>>(
      `http://localhost:8055/items/items/${itemId}`,
      payload
    );
  }

  public delete(itemId: number) {
    return this.httpClient.delete(
      `http://localhost:8055/items/items/${itemId}`
    );
  }
}
