import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  User,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errorMessage!: string;

  hideNewPassword = true;
  hideOldPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9\d@$!%*#?&]*[A-Z]+[a-zA-Z0-9\d@$!%*#?&]*$/
          ),
          Validators.pattern(
            /^[a-zA-Z0-9\d@$!%*#?&]*[0-9]+[a-zA-Z0-9\d@$!%*#?&]*$/
          ),
          Validators.pattern(
            /^[a-zA-Z0-9\d@$!%*#?&]*[a-z]+[a-zA-Z0-9\d@$!%*#?&]*$/
          ),
          Validators.minLength(6),
        ])
      ),
      newPassword: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9\d@$!%*#?&]*[A-Z]+[a-zA-Z0-9\d@$!%*#?&]*$/
          ),
          Validators.pattern(
            /^[a-zA-Z0-9\d@$!%*#?&]*[0-9]+[a-zA-Z0-9\d@$!%*#?&]*$/
          ),
          Validators.pattern(
            /^[a-zA-Z0-9\d@$!%*#?&]*[a-z]+[a-zA-Z0-9\d@$!%*#?&]*$/
          ),
          Validators.minLength(6),
        ])
      ),
    });
  }

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  changePassword(updatePasswordData: {
    oldPassword: string;
    newPassword: string;
  }) {
    this.nbService
      .updatePassword(
        this.user.id,
        updatePasswordData.newPassword,
        updatePasswordData.oldPassword
      )
      .subscribe({
        error: (err) => {
          this.dialogRef.disableClose = false;
          if (err.error) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Unknown Error';
          }
        },
        next: () => {
          this.dialogRef.close(true);
        },
      });
  }
}
