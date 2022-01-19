import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  Part,
  Role,
  Option,
  NodebootOauth2StarterService,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit, OnDestroy {
  optionsForm: FormGroup;
  errorMessage!: string;
  options: Part[] = [];
  allowedShowList: Option[] = [];
  allowedObject: Record<string, Option[]> = {};
  originalAllowedObject: Record<string, Option[]> = {};
  objectKeys = Object.keys;
  convertToString = JSON.stringify;
  partSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<OptionsComponent>,
    @Inject(MAT_DIALOG_DATA) public role: Role,
    private nbService: NodebootOauth2StarterService,
    private formBuilder: FormBuilder
  ) {
    for (const option of this.role.parts) {
      this.allowedObject[option.applicationPartName] = [...option.allowed];
      this.originalAllowedObject[option.applicationPartName] = [
        ...option.allowed,
      ];
    }
    this.nbService.getPartsBasic().subscribe({
      error: (err) => {
        if (err.error) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Unknown Error';
        }
        this.options = [];
      },
      next: (res) => {
        this.options = res.content || [];
      },
    });
    this.optionsForm = this.formBuilder.group({
      part: this.formBuilder.control(''),
      selected: this.formBuilder.control([]),
    });
    this.partSubscription = this.optionsForm
      .get('part')
      ?.valueChanges.subscribe({
        next: (value) => {
          this.allowedShowList =
            this.options.find((o) => o.applicationPartName === value)
              ?.allowed || [];
          this.optionsForm
            .get('selected')
            ?.setValue(
              this.allowedObject[this.optionsForm.get('part')?.value]?.map(
                (asl) => JSON.stringify(asl)
              ) || []
            );
        },
      }) as Subscription;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.partSubscription?.unsubscribe();
  }

  selectedChange(selected: boolean, value: string) {
    const parsedValue = JSON.parse(value) as Option;
    const currentAllowedObject =
      this.allowedObject[this.optionsForm.get('part')?.value];
    if (
      parsedValue.allowed === '*' &&
      selected &&
      this.optionsForm.get('selected')?.value.length !==
        this.allowedShowList.length
    ) {
      this.optionsForm
        .get('selected')
        ?.setValue(this.allowedShowList.map((asl) => JSON.stringify(asl)));
      this.allowedObject[this.optionsForm.get('part')?.value] = [
        this.allowedShowList[0],
      ];
    } else if (parsedValue.allowed === '*' && !selected) {
      const temporalAllowed = [...this.allowedShowList];
      temporalAllowed.shift();
      this.allowedObject[this.optionsForm.get('part')?.value] = temporalAllowed;
    } else if (selected) {
      if (!(currentAllowedObject && currentAllowedObject[0].allowed === '*')) {
        if (
          currentAllowedObject &&
          currentAllowedObject.findIndex((ca) => ca.id === parsedValue.id) ===
            -1
        ) {
          currentAllowedObject.push(parsedValue);
        } else {
          this.allowedObject[this.optionsForm.get('part')?.value] = [
            parsedValue,
          ];
        }
      }
    } else {
      const indexOfValue = this.optionsForm
        .get('selected')
        ?.value.indexOf(parsedValue);
      if (currentAllowedObject && indexOfValue !== -1) {
        currentAllowedObject.splice(indexOfValue, 1);
      }
      if (currentAllowedObject && currentAllowedObject.length === 0) {
        delete this.allowedObject[this.optionsForm.get('part')?.value];
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateOptions() {
    this.nbService
      .updateRoleOptions(
        this.role.id,
        this.allowedObject,
        this.originalAllowedObject
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
