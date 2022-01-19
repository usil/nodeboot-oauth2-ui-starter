import {
  NodebootOauth2StarterService,
  User,
} from './../nodeboot-oauth2-starter.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'lib-oauth-starter-user-profile',
  templateUrl: './oauth-starter-user-profile.component.html',
  styleUrls: ['./oauth-starter-user-profile.component.scss'],
})
export class OauthStarterUserProfileComponent implements OnInit {
  user!: User;

  constructor(
    private nbService: NodebootOauth2StarterService,
    public dialog: MatDialog
  ) {
    this.nbService.getUserProfile().subscribe({
      next: (res) => {
        this.user = res.content as User;
      },
    });
  }

  ngOnInit(): void {}

  // openChangePasswordDialog() {
  //   this.dialog.open(ChangePasswordComponent, {
  //     width: '600px',
  //     maxHeight: '70vh',
  //     data: this.user,
  //   });
  // }
}
