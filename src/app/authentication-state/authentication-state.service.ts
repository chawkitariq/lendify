import { Injectable, signal } from '@angular/core';
import { AuthenticationState } from './authentication-state.type';

const initialState = {
  access_token: '',
  expires: 0,
  refresh_token: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStateService {
  state = signal<AuthenticationState>(initialState);

  isAuthenticated() {
    return true
  }

  login(payload: AuthenticationState) {
    this.state.set(payload);
  }

  logout() {
    this.state.set(initialState);
  }
}
