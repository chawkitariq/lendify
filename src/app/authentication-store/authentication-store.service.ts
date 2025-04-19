import { computed, Injectable } from '@angular/core';
import {
  AuthenticationStoreLoginPayload,
  AuthenticationStore,
} from './authentication-store.type';
import { signalPersistor } from '../utils/state.util';

const initialState = {
  access_token: '',
  expires: 0,
  expiresAt: 0,
  refresh_token: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationStoreService {
  #state = signalPersistor<AuthenticationStore>(
    'authentication',
    initialState,
    localStorage
  );

  accessToken = computed(() => this.#state().access_token);
  refreshToken = computed(() => this.#state().refresh_token);
  expiresAt = computed(() => this.#state().expiresAt);
  isExpired = computed(() => Date.now() > this.expiresAt());

  isAuthenticated = computed(
    () => Boolean(this.accessToken()) && !this.isExpired()
  );

  login(payload: AuthenticationStoreLoginPayload) {
    const expiresAt = Date.now() + payload.expires;
    this.#state.set({
      ...payload,
      expiresAt,
    });
  }

  logout() {
    this.#state.set(initialState);
  }
}
