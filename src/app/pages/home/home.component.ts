import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../../core/schemas/user.schema';
import { UserStorageService } from '../../core/services/user-storage.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent implements OnInit {
  user: UserInfo | null = null;

  constructor(private userStorageService: UserStorageService) {}

  ngOnInit(): void {
    this.userStorageService.currentUser.subscribe(user => this.user = user);
  }
}
