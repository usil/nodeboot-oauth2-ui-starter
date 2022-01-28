import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  User,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {
  errorMessage!: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  ngOnInit(): void {}

  delete() {
    this.dialogRef.disableClose = true;
    this.nbService.deleteUser(this.user.subjectId).subscribe({
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

  closeDialog() {
    this.dialogRef.close();
  }
}
