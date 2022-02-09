import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  Resource,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-delete-application-resource',
  templateUrl: './delete-application-resource.component.html',
  styleUrls: ['./delete-application-resource.component.scss'],
})
export class DeleteApplicationResourceComponent implements OnInit {
  errorMessage!: string;
  loadingResult = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteApplicationResourceComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public resource: Resource
  ) {}

  ngOnInit(): void {}

  delete() {
    this.loadingResult = true;
    this.dialogRef.disableClose = true;
    this.nbService.deleteResource(this.resource.id).subscribe({
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
