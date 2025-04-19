import { AuthenticationLoginResponse } from "../authentication/authentication.type";

export type AuthenticationStore = {
  access_token: string;
  expires: number;
  expiresAt: number;
  refresh_token: string;
};

export type AuthenticationStoreLoginPayload = AuthenticationLoginResponse;
