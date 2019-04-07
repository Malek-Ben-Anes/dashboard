import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.scss']
})
export class NavTabComponent implements OnInit {

  tabs = ['Edit Profile', 'Password', 'Marks', 'Bulletin', 'Time Table'];
  selected = new FormControl(0);

  constructor() { }

  ngOnInit() {
  }

}
