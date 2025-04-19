import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, ItemCreatePayload, ItemUpdatePayload } from './item.interface';
import { ApiResponse } from '../app.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private readonly httpClient: HttpClient) {}

  public create(payload: ItemCreatePayload) {
    return this.httpClient.post<ApiResponse<Item>>(
      `${environment.apiUrl}/items/items`,
      payload
    );
  }

  public findAll() {
    return this.httpClient.get<ApiResponse<Item[]>>(
      `${environment.apiUrl}/items/items`
    );
  }

  public findOne(itemId: number) {
    return this.httpClient.get<ApiResponse<Item>>(
      `${environment.apiUrl}/items/items/${itemId}`
    );
  }

  public findByTitle(title: string) {
    return this.httpClient.get<ApiResponse<Item[]>>(
      `${environment.apiUrl}/items/items?filter[title][_eq]=${title}`
    );
  }

  public update(itemId: number, payload: ItemUpdatePayload) {
    return this.httpClient.patch<ApiResponse<Item>>(
      `${environment.apiUrl}/items/items/${itemId}`,
      payload
    );
  }

  public delete(itemId: number) {
    return this.httpClient.delete(
      `${environment.apiUrl}/items/items/${itemId}`
    );
  }
}
