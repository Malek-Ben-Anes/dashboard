import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from 'app/services/auth/token-storage.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  landingPageNavBar = [];

  constructor(private translate: TranslateService,
              private storage: TokenStorageService) {
  }

  ngOnInit() {
    this.landingPageNavBar = this.landingPageParameters();
  }

  private landingPageParameters(): Header[] {
    return [
      { href: `${this.links()}index.html`, label: 'header.accueil' },
      { href: `${this.links()}notre-ecole/index.html`, label: 'header.aboutUs' },
      { href: `${this.links()}clubs/index.html`, label: 'header.clubs' },
      { href: `${this.links()}contact/index.html`, label: 'header.contact' }];
  }

  private links(): string {
    return this.storage.isRtl() ? '/AR/' : '';
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.storage.saveLanguage(language);
    this.landingPageNavBar = this.landingPageParameters();
  }
}

interface Header {
  href: string;
  label: string;
}
