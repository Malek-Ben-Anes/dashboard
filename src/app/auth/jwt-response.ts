import { Gender } from "app/models/User";

export class JwtResponse {
    accessToken: string;
    type: string;
    id: number;
    username: string;
    name: string;
    email: string;
    authorities: string[];
    gender: Gender;
    photo: string;
}