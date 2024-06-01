import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages'; 
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    MessagesModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'servesync';

  constructor(
    private authService: AuthService) { }

    
  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
