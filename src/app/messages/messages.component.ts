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
