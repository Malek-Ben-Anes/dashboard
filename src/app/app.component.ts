import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './services/auth/token-storage.service';

const AR = 'ar';
const EN = 'en';
const FR = 'fr';
const DEFAULT_LANGUAGE = FR;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isRtl: string = 'ltr';

  constructor(private tokenStorage: TokenStorageService, private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(EN);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(EN);
    if (this.tokenStorage && this.tokenStorage.getLanguage()) {
      this.translate.use(this.tokenStorage.getLanguage())
    } else {
      this.tokenStorage.saveLanguage(DEFAULT_LANGUAGE);
    }
  }

  ngOnInit() {
    if (this.tokenStorage && this.tokenStorage.getLanguage()) {
      this.translate.use(this.tokenStorage.getLanguage())
      this.isRtl = this.direction;
    } else {
      this.tokenStorage.saveLanguage(DEFAULT_LANGUAGE);
      this.isRtl = this.direction;
    }
  }

  private get direction(): string {
    return this.tokenStorage.isRtl() ? 'rtl' : 'ltr';
  }
}
/*
export const BASE_URL = 'http://localhost:8091/';
'https://laplumedor.cfapps.io/';
export const BASE_API_URL = 'http://vps745280.ovh.net:8091';
*/
export const BASE_URL = 'http://localhost:8091/';
export const BASE_API_URL = `${BASE_URL}api/`;