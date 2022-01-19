import {
  Application,
  NodebootOauth2StarterService,
} from './../../nodeboot-oauth2-starter.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-create-application-part',
  templateUrl: './create-application-part.component.html',
  styleUrls: ['./create-application-part.component.scss'],
})
export class CreateApplicationPartComponent implements OnInit {
  createPartForm: FormGroup;
  errorMessage!: string;
  errorMessageRoles!: string;
  applications: Application[] = [];
  hidePassword = true;

  loadingResult = false;

  constructor(
    public dialogRef: MatDialogRef<CreateApplicationPartComponent>,
    private formBuilder: FormBuilder,
    private nbService: NodebootOauth2StarterService
  ) {
    this.nbService.getApplications().subscribe({
      error: (err) => {
        if (err.error) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Unknown Error';
        }
        this.applications = [];
      },
      next: (res) => {
        this.applications = res.content || [];
      },
    });
    this.createPartForm = this.formBuilder.group({
      partIdentifier: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(45),
          Validators.pattern(/^[a-zA-Z0-9.\s]+$/),
        ])
      ),
      application: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, Validators.min(1)])
      ),
    });
  }

  ngOnInit(): void {}

  createPart(createPartForm: { partIdentifier: string; application: number }) {
    this.loadingResult = true;
    this.nbService
      .createPart(createPartForm.partIdentifier, createPartForm.application)
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
        complete: () => {
          this.loadingResult = false;
        },
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
