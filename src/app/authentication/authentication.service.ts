import { Injectable } from '@angular/core';
import {
  AuthenticationLoginPayload,
  AuthenticationResponse,
} from './authentication.type';
import { ApiResponse } from '../app.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly httpClient: HttpClient) {}

  public login(payload: AuthenticationLoginPayload) {
    return this.httpClient.post<ApiResponse<AuthenticationResponse>>(
      'http://localhost:8055/auth/login',
      payload
    );
  }
}
