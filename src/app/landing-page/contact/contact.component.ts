import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact = new Contact();
  constructor() {}

  ngOnInit() {
    this.contact.telephone = '+216 73 665 254';
    this.contact.faxe = '+216 73 665 254';
    this.contact.email = 'contact@laplumedor.tn';
    this.contact.adresse = 'Route Farhet Hached, Moknine 5050 - Tunisie.';
  }

  onSubmit(form: NgForm) {
    this.contact.telephone = form.value['telephone'];
    this.contact.faxe = form.value['faxe'];
    this.contact.email = form.value['email'];
    this.contact.adresse = form.value['adresse'];
    console.log(this.contact);
  }
}

class Contact {
  'telephone': string;
  'faxe': string;
  'email': string;
  'adresse': string;
}