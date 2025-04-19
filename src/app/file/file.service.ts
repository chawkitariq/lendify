import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File, FileUploadPayload } from './file.interface';
import { ApiResponse } from '../app.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private readonly httpClient: HttpClient) {}

  public upload(payload: FileUploadPayload) {
    return this.httpClient.post<ApiResponse<File>>(
      `${environment.apiUrl}/files`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }
}
