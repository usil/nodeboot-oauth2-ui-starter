import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  Role,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss'],
})
export class DeleteRoleComponent implements OnInit {
  errorMessage!: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteRoleComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public role: Role
  ) {}

  ngOnInit(): void {}

  delete() {
    this.dialogRef.disableClose = true;
    this.nbService.deleteRole(this.role.id).subscribe({
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
