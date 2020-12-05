import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '@app/app.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = BASE_API_URL + 'test/user';
  private pmUrl = BASE_API_URL + 'test/pm';
  private adminUrl = BASE_API_URL + 'test/admin';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
