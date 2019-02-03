import { Component, OnInit } from '@angular/core';
import { Message } from './models/message';
import { DialogflowService } from './services/dialogflow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }
  
  ngOnInit() { }


}