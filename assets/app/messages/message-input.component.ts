import { Component, OnInit } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
})

export class MessageInputComponent implements OnInit {
  message: Message;

  constructor(private messageService: MessageService){}

  onSubmit(form: NgForm){
    if(this.message) {
      // edit
      // update the message object referenced in this.message
      this.message.content = form.value.content;
      this.messageService.updateMessage(this.message)
        .subscribe(
          result => console.log(result)
        );

      // clears the reference to message
      this.message = null;
    } else {
      // create
      if (form.valid) {
        const message = new Message(form.value.content, 'Max');
        this.messageService.addMessage(message)
        .subscribe(
          data => console.log(data),
          error => console.error(error)
        );
      }
      form.resetForm();
    }
  }
  onCancel(form: NgForm) {
    this.message = null;
    form.resetForm();
  }
  ngOnInit() {
    this.messageService.messageIsEdit.subscribe(
      (message: Message) => this.message = message
    )
  }
}
