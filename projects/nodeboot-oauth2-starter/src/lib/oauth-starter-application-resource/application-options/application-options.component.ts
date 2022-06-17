import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NodebootOauth2StarterService,
  Resource,
  Option,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-application-options',
  templateUrl: './application-options.component.html',
  styleUrls: ['./application-options.component.scss'],
})
export class ApplicationOptionsComponent implements OnInit {
  addResourceOptionForm: UntypedFormGroup;
  errorMessage!: string;
  errorMessageRoles!: string;
  options: Option[] = [];
  optionsList: Option[] = [];
  hidePassword = true;

  constructor(
    public dialogRef: MatDialogRef<ApplicationOptionsComponent>,
    private formBuilder: UntypedFormBuilder,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public resource: Resource
  ) {
    this.optionsList = [...resource.allowed];
    this.addResourceOptionForm = this.formBuilder.group({
      name: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
          Validators.minLength(1),
          Validators.maxLength(40),
        ])
      ),
    });
  }

  ngOnInit(): void {}

  isBasicOption(allowed: string) {
    const basicOptions = ['*', 'create', 'select', 'update', 'delete'];
    const indexOfAllowed = basicOptions.indexOf(allowed);
    if (indexOfAllowed === -1) return false;
    return true;
  }

  addOptionToList() {
    const currentNameValue =
      (this.addResourceOptionForm.get('name')?.value as string) || '';
    if (currentNameValue === '') return;
    const indexOfCurrent = this.optionsList.findIndex(
      (option) =>
        option.allowed.toLowerCase() === currentNameValue.toLowerCase()
    );
    if (
      indexOfCurrent === -1 &&
      this.addResourceOptionForm.get('name')?.valid
    ) {
      this.optionsList.push({
        id: 0,
        allowed: this.addResourceOptionForm.get('name')?.value,
      });
      this.addResourceOptionForm.get('name')?.reset();
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

  updateResourceOptions() {
    this.nbService
      .updateResourceOptions(
        this.resource.id,
        this.optionsList,
        this.resource.allowed
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
