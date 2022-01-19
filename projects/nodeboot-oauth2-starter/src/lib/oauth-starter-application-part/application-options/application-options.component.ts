import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  Part,
  Option,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-application-options',
  templateUrl: './application-options.component.html',
  styleUrls: ['./application-options.component.scss'],
})
export class ApplicationOptionsComponent implements OnInit {
  addPartOptionForm: FormGroup;
  errorMessage!: string;
  errorMessageRoles!: string;
  options: Option[] = [];
  optionsList: Option[] = [];
  hidePassword = true;

  constructor(
    public dialogRef: MatDialogRef<ApplicationOptionsComponent>,
    private formBuilder: FormBuilder,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public part: Part
  ) {
    this.optionsList = [...part.allowed];
    this.addPartOptionForm = this.formBuilder.group({
      name: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.pattern(/^[a-zA-Z0-9]+$/),
          Validators.minLength(1),
          Validators.maxLength(40),
        ])
      ),
    });
  }

  ngOnInit(): void {}

  addOptionToList() {
    const currentNameValue =
      (this.addPartOptionForm.get('name')?.value as string) || '';
    if (currentNameValue === '') return;
    const indexOfCurrent = this.optionsList.findIndex(
      (option) =>
        option.allowed.toLowerCase() === currentNameValue.toLowerCase()
    );
    if (indexOfCurrent === -1 && this.addPartOptionForm.get('name')?.valid) {
      this.optionsList.push({
        id: 0,
        allowed: this.addPartOptionForm.get('name')?.value,
      });
      this.addPartOptionForm.get('name')?.reset();
    }
  }

  removeFromOptionList(optionToRemove: Option) {
    const indexToRemove = this.optionsList.findIndex(
      (option) =>
        option.allowed.toLowerCase() === optionToRemove.allowed.toLowerCase()
    );
    this.optionsList.splice(indexToRemove, 1);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updatePartOptions() {
    this.nbService
      .updatePartOptions(this.part.id, this.optionsList, this.part.allowed)
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
