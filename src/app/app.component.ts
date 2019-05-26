import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}
  
  ngOnInit() {}
}

export const BASE_URL: string = 'https://la-plume-dor.cfapps.io/';
export const BASE_API_URL: string = 'https://la-plume-dor.cfapps.io/api/';
export const ASSET_URL: string = 'https://la-plume-dor.cfapps.io/uploads';
