import { Injectable } from '@angular/core';
import { BASE_API_URL } from 'app/app.component';



const FILE_UPLOAD_URL: string = BASE_API_URL + 'profile/';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  constructor() { }
}
