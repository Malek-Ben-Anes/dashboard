import { Component, OnInit } from '@angular/core';
import { Message } from './models/message';
import { DialogflowService } from './services/dialogflow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {}
  
  ngOnInit() {}
}

export const BASE_URL: string = 'https://laplumedor.cfapps.io/';
export const BASE_API_URL: string = 'https://laplumedor.cfapps.io/api/';

export const GlobalVariable = Object.freeze({
  BASE_API_URL: 'https://laplumedor.cfapps.io/api/',
  //... more of your variables
});
