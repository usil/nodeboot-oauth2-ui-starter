import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  User,
  UserUpdateBody,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  errorMessage!: string;
  updateUserForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    this.updateUserForm = this.formBuilder.group({
      name: this.formBuilder.control(
        user.name,
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(45),
          Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
        ])
      ),
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateUser(updateUserData: UserUpdateBody) {
    this.dialogRef.disableClose = true;
    this.nbService.updateUser(this.user.subjectId, updateUserData).subscribe({
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

  ngOnInit(): void {}
}
