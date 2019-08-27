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
    } else {
      this.tokenStorage.saveLanguage(DEFAULT_LANGUAGE);
    }
  }
}

export const BASE_URL = 'https://laplumedor.cfapps.io/'; // 'https://laplumedor.cfapps.io/';  'http://localhost:8091/'
export const BASE_API_URL = 'https://laplumedor.cfapps.io/api/';
export const ASSET_URL = 'https://laplumedor.cfapps.io/uploads';
