import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TokenStorageService} from '@app/services/auth/token-storage.service';
import {environment} from 'environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  landingPageNavBar: Header[] = [];
  language: string

  constructor(private translate: TranslateService,
              private storage: TokenStorageService) {
  }

  ngOnInit() {
    this.switchLanguage();
    this.landingPageLinks();
  }

  private async landingPageLinks() {
    const direction = await this.storage.isRtl() ? '' : 'FR/';
    const baseUrl = environment.landingPageUrl + direction;
    this.landingPageNavBar = [
      {
        href: `${baseUrl}index.html`,
        label: 'header.accueil',
      },
      {
        href: `${baseUrl}notre-ecole/index.html`,
        label: 'header.aboutUs',
      },
      {
        href: `${baseUrl}clubs/index.html`,
        label: 'header.clubs',
      },
      {href: `${baseUrl}contact/index.html`,
        label: 'header.contact',
      },
    ];
  }

  async switchLanguage(lang?: string) {
    this.language = lang ? lang : await this.storage.getLanguage();
    this.translate.use(this.language);
    this.storage.saveLanguage(this.language);
    this.landingPageLinks();
  }
}

interface Header {
  href: string;
  label: string;
}
