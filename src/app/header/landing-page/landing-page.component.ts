import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const AR = 'ar';
const EN = 'en';
const FR = 'fr';

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

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.use(FR);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
