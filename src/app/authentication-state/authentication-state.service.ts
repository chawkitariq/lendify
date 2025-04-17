import { computed, Injectable } from '@angular/core';
import { AuthenticationState } from './authentication-state.type';
import { signalPersistor } from '../utils/state.util';

const initialState = {
  access_token: '',
  expires: 0,
  refresh_token: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStateService {
  state = signalPersistor<AuthenticationState>(
    'authentication',
    initialState,
    localStorage
  );

  accessToken = computed(() => this.state().access_token);
  isAuthenticated = computed(() => Boolean(this.state().access_token));

  login(payload: AuthenticationState) {
    this.state.set(payload);
  }

  logout() {
    this.state.set(initialState);
  }
}
