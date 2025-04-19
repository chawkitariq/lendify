export type AuthenticationLoginResponse = {
  access_token: string;
  expires: number;
  refresh_token: string;
};

export type AuthenticationRefreshTokenResponse = AuthenticationLoginResponse;

export type AuthenticationLoginPayload = {
  email: string;
  password: string;
};

export type AuthenticationRefreshTokenPayload = {
  refresh_token: string;
};
