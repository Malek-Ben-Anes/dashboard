import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  tabs = ['Accueil', 'Notre ecole', 'Actualites', 'clubs', 'Contact'];
  selected = new FormControl(0);

  isNew: boolean = true;


  constructor() { }

  ngOnInit() {}


}
