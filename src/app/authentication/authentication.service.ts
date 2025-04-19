import { Injectable } from '@angular/core';
import {
  AuthenticationLoginPayload,
  AuthenticationRefreshTokenPayload,
  AuthenticationLoginResponse,
  AuthenticationRefreshTokenResponse,
} from './authentication.type';
import { ApiResponse } from '../app.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly httpClient: HttpClient) {
    httpClient;
  }

  public login(payload: AuthenticationLoginPayload) {
    return this.httpClient.post<ApiResponse<AuthenticationLoginResponse>>(
      `${environment.apiUrl}/auth/login`,
      payload
    );
  }

  public refreshToken(payload: AuthenticationRefreshTokenPayload) {
    return this.httpClient.post<
      ApiResponse<AuthenticationRefreshTokenResponse>
    >(`${environment.apiUrl}/auth/refresh`, payload);
  }
}
