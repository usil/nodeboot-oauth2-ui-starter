import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  Resource,
  Option,
  NodebootOauth2StarterService,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit, OnDestroy {
  createRoleForm: FormGroup;
  errorMessage!: string;
  options: Resource[] = [];
  allowedShowList: Option[] = [];
  allowedObject: Record<string, Option[]> = {};
  objectKeys = Object.keys;
  resourceSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private nbService: NodebootOauth2StarterService,
    public dialogRef: MatDialogRef<CreateRoleComponent>
  ) {
    this.nbService.getResourcesBasic().subscribe({
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
    this.createRoleForm = this.formBuilder.group({
      identifier: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_\.\-\/]+$/),
          Validators.minLength(4),
          Validators.maxLength(20),
        ])
      ),
      resource: this.formBuilder.control(''),
      selected: this.formBuilder.control(''),
    });
    this.resourceSubscription = this.createRoleForm
      .get('resource')
      ?.valueChanges.subscribe({
        next: (value) => {
          this.allowedShowList =
            this.options.find((o) => o.applicationResourceName === value)
              ?.allowed || [];
          this.createRoleForm
            .get('selected')
            ?.setValue(
              this.allowedObject[this.createRoleForm.get('resource')?.value] ||
                []
            );
        },
      }) as Subscription;
  }

  ngOnDestroy(): void {
    this.resourceSubscription?.unsubscribe();
  }

  ngOnInit(): void {}

  createRole(roleBody: { identifier: string; resource: string | undefined }) {
    this.nbService
      .createRole(roleBody.identifier, this.allowedObject)
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

  selectedChange(selected: boolean, value: Option) {
    const currentAllowedObject =
      this.allowedObject[this.createRoleForm.get('resource')?.value];
    if (
      value.allowed === '*' &&
      selected &&
      this.createRoleForm.get('selected')?.value.length !==
        this.allowedShowList.length
    ) {
      this.createRoleForm.get('selected')?.setValue(this.allowedShowList);
      this.allowedObject[this.createRoleForm.get('resource')?.value] = [
        this.allowedShowList[0],
      ];
    } else if (value.allowed === '*' && !selected) {
      const temporalAllowed = [...this.allowedShowList];
      temporalAllowed.shift();
      this.allowedObject[this.createRoleForm.get('resource')?.value] =
        temporalAllowed;
    } else if (selected) {
      if (!(currentAllowedObject && currentAllowedObject[0].allowed === '*')) {
        if (
          currentAllowedObject &&
          currentAllowedObject.findIndex((ca) => ca.id === value.id)
        ) {
          currentAllowedObject.push(value);
        } else {
          this.allowedObject[this.createRoleForm.get('resource')?.value] = [
            value,
          ];
        }
      }
    } else {
      const indexOfValue = this.createRoleForm
        .get('selected')
        ?.value.indexOf(value);
      if (currentAllowedObject && indexOfValue !== -1) {
        currentAllowedObject.splice(indexOfValue, 1);
      }
      if (currentAllowedObject && currentAllowedObject.length === 0) {
        delete this.allowedObject[this.createRoleForm.get('resource')?.value];
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
