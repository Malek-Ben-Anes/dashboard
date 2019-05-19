import { Gender, User } from "app/models/User";

export class JwtResponse {
    accessToken: string;
    type: string;
    id: string;
    user: User;
    username: string;
    name: string;
    email: string;
    authorities: string[];
    gender: Gender;
    photo: string;
    newNotifications: number;
}

export interface jwtToken {
  accessToken: JwtResponse;
  tokenType: string;
}