import { User } from "@app/models/User";
export class JwtResponse {
  user: User;
  username: string; // email
  authorities: string[];
  exp: string;
}

export interface JwtTokenResponse {
  token: JwtResponse;
  type: string;
}