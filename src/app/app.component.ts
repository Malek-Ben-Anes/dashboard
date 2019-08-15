import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const AR = 'ar';
const EN = 'en';
const FR = 'fr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(EN);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(EN);
  }

  ngOnInit() {
    this.translate.use(FR);
  }
}

export const BASE_URL = 'https://laplumedor.cfapps.io/'; // 'https://laplumedor.cfapps.io/';  'http://localhost:8091/'
export const BASE_API_URL = 'https://laplumedor.cfapps.io/api/';
export const ASSET_URL = 'https://laplumedor.cfapps.io/uploads';