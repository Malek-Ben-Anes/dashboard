import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { EmailsService } from 'app/services/emails.service';
import { Email } from 'app/models/email.modal';
import { Pageable } from 'app/models/pageable.modal';

@Component({
  selector: 'app-emails-list',
  templateUrl: './emails-list.component.html',
  styleUrls: ['./emails-list.component.scss']
})
export class EmailsListComponent implements OnInit {

  emailsPage: Email[];

  constructor(private emailService: EmailsService) { }

  ngOnInit() {
    this.emailService.findAll(0)
    .then(emails => { this.emailsPage = emails.content; console.log(emails ); });
  }

  onDelete(email: Email): void {
    this.emailService.delete(email.id)
     .then(this.emailsPage = _.filter(this.emailsPage, (item: Email) => item.id !== email.id));
  }

}
