import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';

export const landingPageNavBar = [{ 'href': 'index.html', 'label': 'header.accueil' },
{ 'href': 'notre-ecole/index.html', 'label': 'header.aboutUs' },
{ 'href': 'clubs/index.html', 'label': 'header.clubs' },
{ 'href': 'contact/index.html', 'label': 'header.contact' }];

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  landingPageNavBar = landingPageNavBar;

  constructor(private translate: TranslateService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    // this.translate.use(this.tokenStorage.getLanguage());
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.tokenStorage.saveLanguage(language);
  }
}
