import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Client,
  ClientUpdateBody,
  NodebootOauth2StarterService,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
})
export class UpdateClientComponent implements OnInit {
  errorMessage!: string;
  updateUserForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<UpdateClientComponent>,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public client: Client
  ) {
    this.updateUserForm = this.formBuilder.group({
      name: this.formBuilder.control(
        client.name,
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

  updateUser(updateClientData: ClientUpdateBody) {
    this.dialogRef.disableClose = true;
    this.nbService
      .updateClient(this.client.subjectId, updateClientData)
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

  ngOnInit(): void {}
}
