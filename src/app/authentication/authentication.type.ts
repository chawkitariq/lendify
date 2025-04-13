export type AuthenticationResponse = {
    access_token: string;
    expires: number;
    refresh_token: string;
  };
  
  export type AuthenticationLoginPayload = {
    email: string;
    password: string;
  };
  