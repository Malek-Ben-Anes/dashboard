import { Gender, User } from "app/models/User";

export class JwtResponse {
    accessToken: string;
    type: string;
    id: string;
    user: User;
    username: string;
    authorities: string[];
}

export interface JwtToken {
  accessToken: JwtResponse;
  tokenType: string;
}