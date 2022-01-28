import { NodebootOauth2StarterService } from './../../nodeboot-oauth2-starter.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasicRole, Client } from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-add-client-roles',
  templateUrl: './add-client-roles.component.html',
  styleUrls: ['./add-client-roles.component.scss'],
})
export class AddClientRolesComponent implements OnInit {
  addRolesForm: FormGroup;
  errorMessage!: string;
  errorMessageRoles!: string;
  roles: BasicRole[] = [];
  rolesList: BasicRole[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddClientRolesComponent>,
    private formBuilder: FormBuilder,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public client: Client
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
        const availableRoles = res.content?.flatMap((c) => {
          const roleExist = client.roles.findIndex(
            (r) => c.id == r.id
          ) as number;
          if (roleExist === -1) {
            return c;
          }
          this.rolesList.push(c);
          return [];
        });
        this.roles = availableRoles || [];
      },
    });
    this.addRolesForm = this.formBuilder.group({
      role: this.formBuilder.control(''),
    });
  }

  ngOnInit(): void {}

  addRoleToList() {
    const roleValue = this.addRolesForm.get('role')?.value;
    if (!roleValue) {
      return;
    }
    const indexOfRole = this.roles.indexOf(roleValue);
    this.roles.splice(indexOfRole, 1);
    this.rolesList.push(roleValue);
    this.addRolesForm.get('role')?.setValue('');
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

  updateRoles() {
    const rolesListToSend = this.rolesList.flatMap((rl) => {
      const roleExist = this.client.roles.findIndex(
        (r) => rl.id == r.id
      ) as number;
      if (roleExist === -1) {
        return rl;
      }
      return [];
    });
    if (rolesListToSend.length === 0) {
      return this.dialogRef.close(false);
    }
    this.nbService
      .updateClientRoles(this.client.id, rolesListToSend)
      .subscribe({
        error: (err) => {
          if (err.error) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Unknown Error';
          }
          this.roles = [];
        },
        next: () => {
          this.dialogRef.close(true);
        },
      });
  }
}
