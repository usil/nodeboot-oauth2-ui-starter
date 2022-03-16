import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  Part,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-delete-application-part',
  templateUrl: './delete-application-part.component.html',
  styleUrls: ['./delete-application-part.component.scss'],
})
export class DeleteApplicationPartComponent implements OnInit {
  errorMessage!: string;
  loadingResult = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteApplicationPartComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public part: Part
  ) {}

  ngOnInit(): void {}

  delete() {
    this.loadingResult = true;
    this.dialogRef.disableClose = true;
    this.nbService.deletePart(this.part.id).subscribe({
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
      complete: () => {
        this.loadingResult = false;
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
