import { Component, OnInit } from '@angular/core';
import { DialogflowService } from 'app/services/dialogflow.service';
import { Message } from 'app/models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  // http://www.blog.labouardy.com/chatbot-with-angular-5-dialogflow/
  // https://github.com/mlabouardy/dialogflow-angular5

  message: Message;
  messages: Message[] = [];

  constructor(private dialogFlowService: DialogflowService ) { }

  ngOnInit() {
    this.message = new Message('', 'assets/images/user.png');
    this.messages = [
      new Message('Welcome to chatbot universe', 'assets/images/bot.png', new Date())
    ];
    this.messages.push(new Message('message content', 'assets/images/user.png'));
    this.messages.push(new Message('message content', 'assets/images/bot.png'));
    this.messages.push(new Message('message content', 'assets/images/user.png'));
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);

    // this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
    //   this.messages.push(
    //     new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp)
    //   );
    // });

    this.message = new Message('', 'assets/images/user.png');
}

}


/* NOTIFICATIONS COMOPENENT



showNotification(from, align){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }


<div class="main-content">
  <div class="container-fluid">
      <div class="card">
          <div class="card-header card-header-danger">
              <h3 class="card-title">Notifications</h3>
              <p class="card-category">Handcrafted by our friend
                  <a target="_blank" href="https://github.com/mouse0270">Robert McIntosh</a>. Please checkout the
                  <a href="http://bootstrap-notify.remabledesigns.com/" target="_blank">full documentation.</a>
              </p>
          </div>
          <div class="card-body">
              <div class="row">
                  <div class="col-md-6">
                      <h4 class="card-title">Notifications Style</h4>
                      <div class="alert alert-info">
                          <span>This is a plain notification</span>
                      </div>
                      <div class="alert alert-info">
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span>This is a notification with close button.</span>
                      </div>
                      <div class="alert alert-info alert-with-icon" data-notify="container">
                          <i class="material-icons" data-notify="icon">add_alert</i>
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span data-notify="message">This is a notification with close button and icon.</span>
                      </div>
                      <div class="alert alert-info alert-with-icon" data-notify="container">
                          <i class="material-icons" data-notify="icon">add_alert</i>
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span data-notify="message">This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don't have to worry about the style.</span>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <h4 class="card-title">Notification states</h4>
                      <div class="alert alert-info">
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span>
                              <b> Info - </b> This is a regular notification made with ".alert-info"</span>
                      </div>
                      <div class="alert alert-success">
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span>
                              <b> Success - </b> This is a regular notification made with ".alert-success"</span>
                      </div>
                      <div class="alert alert-warning">
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span>
                              <b> Warning - </b> This is a regular notification made with ".alert-warning"</span>
                      </div>
                      <div class="alert alert-danger">
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span>
                              <b> Danger - </b> This is a regular notification made with ".alert-danger"</span>
                      </div>
                      <div class="alert alert-primary">
                          <button mat-button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <i class="material-icons">close</i>
                          </button>
                          <span>
                              <b> Primary - </b> This is a regular notification made with ".alert-primary"</span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-md-12">
              <div class="places-buttons">
                  <div class="row">
                      <div class="col-md-6 ml-auto mr-auto text-center">
                          <h4 class="card-title">
                              Notifications Places
                              <p class="category">Click to view notifications</p>
                          </h4>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-lg-8 col-md-10 ml-auto mr-auto">
                          <div class="row">
                              <div class="col-md-4">
                                  <button mat-raised-button class="btn btn-danger btn-block" (click)="showNotification('top','left')">Top Left</button>
                              </div>
                              <div class="col-md-4">
                                  <button mat-raised-button class="btn btn-danger btn-block" (click)="showNotification('top','center')">Top Center</button>
                              </div>
                              <div class="col-md-4">
                                  <button mat-raised-button class="btn btn-danger btn-block" (click)="showNotification('top','right')">Top Right</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-lg-8 col-md-10 ml-auto mr-auto">
                          <div class="row">
                              <div class="col-md-4">
                                  <button mat-raised-button class="btn btn-danger btn-block" (click)="showNotification('bottom','left')">Bottom Left</button>
                              </div>
                              <div class="col-md-4">
                                  <button mat-raised-button class="btn btn-danger btn-block" (click)="showNotification('bottom','center')">Bottom Center</button>
                              </div>
                              <div class="col-md-4">
                                  <button mat-raised-button class="btn btn-danger btn-block" (click)="showNotification('bottom','right')">Bottom Right</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</div>


*/