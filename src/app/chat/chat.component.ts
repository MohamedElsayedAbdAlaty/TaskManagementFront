import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  user: string = '';
  message: string = '';

  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.startConnection();
  }

  sendMessage(): void {
    if (this.user && this.message) {
      this.chatService.sendMessage(this.user, this.message);
      this.message = ''; // Clear the input field after sending
    }
  }
}
