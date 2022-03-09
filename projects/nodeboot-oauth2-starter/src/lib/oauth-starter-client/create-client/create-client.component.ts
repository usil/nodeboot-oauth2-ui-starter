import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  BasicRole,
  NodebootOauth2StarterService,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
})
export class CreateClientComponent implements OnInit {
  createClientForm: FormGroup;
  errorMessage!: string;
  errorMessageRoles!: string;
  roles: BasicRole[] = [];
  rolesList: BasicRole[] = [];
  hidePassword = true;

  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,
    private formBuilder: FormBuilder,
    private nbService: NodebootOauth2StarterService
  ) {
    this.nbService.getRolesBasic().subscribe({
      error: (err) => {
        if (err.error) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Unknown Error';
        }
        this.roles = [];
      },
      next: (res) => {
        this.roles = res.content || [];
      },
    });
    this.createClientForm = this.formBuilder.group({
      name: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(45),
          Validators.pattern(/^[a-zA-Z0-9_\.\-\/\s]+$/),
        ])
      ),
      description: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255),
        ])
      ),
      identifier: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9_\.\-\/]+$/),
          Validators.minLength(4),
          Validators.maxLength(20),
        ])
      ),
      role: this.formBuilder.control(''),
      longLive: this.formBuilder.control(false),
    });
  }

  ngOnInit(): void {}

  addRoleToList() {
    const roleValue = this.createClientForm.get('role')?.value;
    if (!roleValue) {
      return;
    }
    const indexOfRole = this.roles.indexOf(roleValue);
    this.roles.splice(indexOfRole, 1);
    this.rolesList.push(roleValue);
    this.createClientForm.get('role')?.setValue('');
  }

  removeRoleToList(role: BasicRole) {
    const roleValue = role;
    const indexOfRole = this.roles.indexOf(roleValue);
    this.rolesList.splice(indexOfRole, 1);
    this.roles.push(roleValue);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createClient(createClientData: {
    name: string;
    identifier: string;
    role: string | undefined;
    longLive?: boolean;
  }) {
    const longLive = createClientData.longLive || false;
    createClientData.role = undefined;
    createClientData.longLive = undefined;
    this.dialogRef.disableClose = true;
    this.nbService
      .createClient({ ...createClientData, roles: this.rolesList }, longLive)
      .subscribe({
        error: (err) => {
          this.dialogRef.disableClose = false;
          if (err.error) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Unknown Error';
          }
        },
        next: (res) => {
          this.dialogRef.close(res.content);
        },
      });
  }
}
