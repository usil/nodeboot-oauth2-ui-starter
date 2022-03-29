import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  BasicRole,
  NodebootOauth2StarterService,
  User,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss'],
})
export class AddUserRolesComponent implements OnInit {
  addRolesForm: FormGroup;
  errorMessage!: string;
  errorMessageRoles!: string;
  roles: BasicRole[] = [];
  rolesList: BasicRole[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddUserRolesComponent>,
    private formBuilder: FormBuilder,
    private nbService: NodebootOauth2StarterService,
    @Inject(MAT_DIALOG_DATA) public user: User
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
          const roleExist = user.roles.findIndex((r) => c.id == r.id) as number;
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
    const indexOfRole = this.rolesList.indexOf(roleValue);
    this.roles.unshift(role);
    this.rolesList.splice(indexOfRole, 1);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateRoles() {
    const basicOriginalRoles = this.user.roles.map((rl) => {
      return { id: rl.id, identifier: rl.identifier };
    });
    this.nbService
      .updateUserRoles(this.user.subjectId, this.rolesList, basicOriginalRoles)
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
