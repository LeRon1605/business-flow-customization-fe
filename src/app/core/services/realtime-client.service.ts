import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { environment } from '../../../environments/environment';
import { ToastService, TokenStorageService, UserStorageService } from '.';
import { NotificationDto } from '../schemas';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  public notification$: Subject<NotificationDto> = new Subject<NotificationDto>();
  public realtime$: Subject<NotificationDto> = new Subject<NotificationDto>();
  private hubConnection?: signalR.HubConnection;
  private isSetStop: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private toastService: ToastService,
    private userStorageService: UserStorageService
  ) { 

    this.userStorageService.currentUser.subscribe(x => {
      if (x) {
        if (this.hubConnection?.state == signalR.HubConnectionState.Connected)
          return;
        
        this.startConnection();
        this.onNotification();
      } else {
        this.stop();
      }
    })

  }

  public startConnection() {
    const options : signalR.IHttpConnectionOptions = { 
      withCredentials: false, 
      accessTokenFactory: () => <string>this.tokenStorage.getAccessToken(), 
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets 
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.notificationUrl}/notification-hub`, options)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));

    this.hubConnection.onclose(() => { 

      setTimeout(() => {
        
        if (this.isSetStop)
          return;

        console.log('Retry connect');

        this.hubConnection?.start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err));
      }, 5000);

    });
  }

  public stop() {
    this.isSetStop = true;
    this.hubConnection?.stop();
  }

  public onNotification() {
    this.hubConnection?.on('NotificationMessage', (data: NotificationDto) => {
      console.log('Notification', data);
      this.notification$.next(data);
      this.toastService.notification(data.title, data.content);
    });

    this.hubConnection?.on('RealTimeMessage', (data: NotificationDto) => {
      console.log('Realtime', data);
      this.realtime$.next(data);
    });
  }

}