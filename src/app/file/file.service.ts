import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File, FileUploadPayload } from './file.interface';
import { ApiResponse } from '../app.type';
import { environment } from '../../environments/environment';
import { toFormData } from '../utils/app.util';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private readonly httpClient: HttpClient) {}

  public upload(payload: FileUploadPayload) {
    const formData = toFormData(payload);
    return this.httpClient.post<ApiResponse<File>>(
      `${environment.apiUrl}/files`,
      formData
    );
  }
}
