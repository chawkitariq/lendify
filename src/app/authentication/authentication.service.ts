import { Injectable } from '@angular/core';
import {
  AuthenticationLoginPayload,
  AuthenticationResponse,
} from './authentication.type';
import { ApiResponse } from '../app.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly httpClient: HttpClient) {
    httpClient
  }

  public login(payload: AuthenticationLoginPayload) {
    return this.httpClient.post<ApiResponse<AuthenticationResponse>>(
      `${environment.apiUrl}/auth/login`,
      payload
    );
  }
}
