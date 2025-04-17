import { computed, Injectable } from '@angular/core';
import { AuthenticationStore } from './authentication-store.type';
import { signalPersistor } from '../utils/state.util';

const initialState = {
  access_token: '',
  expires: 0,
  refresh_token: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStoreService {
  state = signalPersistor<AuthenticationStore>(
    'authentication',
    initialState,
    localStorage
  );

  accessToken = computed(() => this.state().access_token);
  isAuthenticated = computed(() => Boolean(this.state().access_token));

  login(payload: AuthenticationStore) {
    this.state.set(payload);
  }

  logout() {
    this.state.set(initialState);
  }
}
