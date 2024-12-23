import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  /*private hubConnection!: signalR.HubConnection;

  messages: { user: string; message: string }[] = [];

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7195/chatHub') // Update URL as necessary
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.error('Error starting SignalR connection:', err));

    // Listen for incoming messages
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messages.push({ user, message });
    });
  }

  sendMessage(user: string, message: string): void {
    this.hubConnection
      .invoke('SendMessageToUser', user, message)
      .catch((err) => console.error('Error sending message:', err));
  }*/
      private hubConnection: HubConnection;
      messages: { user: string; message: string }[] = [];
      constructor(private authService: AuthService) {
        this.hubConnection = new HubConnectionBuilder()
          .withUrl('https://localhost:7195/chathub/', {
            accessTokenFactory: () => { 
              const token = localStorage.getItem('token');
          if (token) {
            return token;  // Return the JWT token stored in localStorage
          } else {
            console.error("Token is not available");
            return '';  // Return an empty string if no token is found
          }
              //return  localStorage.getItem('token') || ''
            
            
            }
          })
          .build();
      }
    
      startConnection() {
        this.hubConnection
          .start()
          .then(() => {
            console.log('SignalR Connected');
          })
          .catch((err) => {
            console.error('Error while starting SignalR connection: ' + err);
          });
      }
    
      sendMessage(user: string, message: string) {
        if (this.hubConnection.state === 'Connected') {
          this.hubConnection.invoke('SendMessage', user, message).catch((err) => {
            console.error('Error sending message: ', err);
          });
        } else {
          console.error('SignalR connection is not in a connected state');
        }
      }
    
      addReceiveMessageListener(callback: (user: string, message: string) => void) {
        this.hubConnection.on('ReceiveMessage', callback);
      }
}
