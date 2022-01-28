import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Client,
  NodebootOauth2StarterService,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.scss'],
})
export class DeleteClientComponent implements OnInit {
  errorMessage!: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteClientComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public client: Client
  ) {}

  ngOnInit(): void {}

  delete() {
    this.dialogRef.disableClose = true;
    this.nbService.deleteClient(this.client.subjectId).subscribe({
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
