import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  BehaviorSubject,
  Subscription,
  merge,
  startWith,
  switchMap,
  catchError,
  of,
  map,
  first,
} from 'rxjs';
import {
  BasicRole,
  NodebootOauth2StarterService,
  Role,
} from '../nodeboot-oauth2-starter.service';
import { CreateRoleComponent } from './create-role/create-role.component';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { OptionsComponent } from './options/options.component';

@Component({
  selector: 'lib-oauth-starter-roles',
  templateUrl: './oauth-starter-roles.component.html',
  styleUrls: ['./oauth-starter-roles.component.scss'],
})
export class OauthStarterRolesComponent implements OnInit {
  roles!: BasicRole[];
  errorMessage!: string | undefined;
  displayedColumns: string[] = ['id', 'identifier', 'options', 'delete'];

  resultsLength = 0;
  isLoadingResults = true;

  reload = new BehaviorSubject<number>(0);

  roleDataSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private nbService: NodebootOauth2StarterService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.roleDataSubscription?.unsubscribe();
    this.sort.sortChange.complete();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.roleDataSubscription = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.reload
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.errorMessage = undefined;
          this.isLoadingResults = true;
          return this.nbService
            .getRoles(this.paginator.pageIndex, this.sort.direction)
            .pipe(
              catchError((err) => {
                if (err.error) {
                  this.errorMessage = err.error.message;
                } else {
                  this.errorMessage = 'Unknown Error';
                }
                return of(null);
              })
            );
        }),
        map((data) => {
          this.isLoadingResults = false;
          if (data === null) {
            return [];
          }
          this.resultsLength = data.content?.totalItems || 0;
          return data.content?.items || [];
        })
      )
      .subscribe((data) => {
        this.roles = data;
      });
  }

  openCreateRoleDialog() {
    const createRoleDialogRef = this.dialog.open(CreateRoleComponent, {
      width: '600px',
      maxHeight: '70vh',
    });
    createRoleDialogRef
      .afterClosed()
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res) {
            this.reload.next(this.reload.value + 1);
          }
        },
      });
  }

  openOptionsDialog(role: Role) {
    const optionsRoleDialogRef = this.dialog.open(OptionsComponent, {
      width: '600px',
      maxHeight: '70vh',
      data: role,
    });
    optionsRoleDialogRef
      .afterClosed()
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res) {
            this.reload.next(this.reload.value + 1);
          }
        },
      });
  }

  openDeleteRoleDialog(role: Role) {
    const deleteRoleDialogRef = this.dialog.open(DeleteRoleComponent, {
      width: '600px',
      maxHeight: '70vh',
      data: role,
    });
    deleteRoleDialogRef
      .afterClosed()
      .pipe(first())
      .subscribe({
        next: (res) => {
          if (res) {
            this.reload.next(this.reload.value + 1);
          }
        },
      });
  }
}
