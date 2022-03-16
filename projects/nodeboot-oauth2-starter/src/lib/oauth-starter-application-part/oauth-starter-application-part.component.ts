import { NodebootOauth2StarterService } from './../nodeboot-oauth2-starter.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { Part } from '../nodeboot-oauth2-starter.service';
import { ApplicationOptionsComponent } from './application-options/application-options.component';
import { CreateApplicationPartComponent } from './create-application-part/create-application-part.component';
import { DeleteApplicationPartComponent } from './delete-application-part/delete-application-part.component';

@Component({
  selector: 'lib-oauth-starter-application-part',
  templateUrl: './oauth-starter-application-part.component.html',
  styleUrls: ['./oauth-starter-application-part.component.scss'],
})
export class OauthStarterApplicationPartComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  parts!: Part[];
  errorMessage!: string | undefined;
  displayedColumns: string[] = [
    'id',
    'applicationPartName',
    'options',
    'delete',
  ];

  masterParts = [
    'OAUTH2_global',
    'OAUTH2_user',
    'OAUTH2_client',
    'OAUTH2_application',
    'OAUTH2_role',
    'OAUTH2_option',
  ];

  resultsLength = 0;
  isLoadingResults = true;

  reload = new BehaviorSubject<number>(0);

  userDataSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private nbService: NodebootOauth2StarterService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
    this.sort.sortChange.complete();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.userDataSubscription = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.reload
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.errorMessage = undefined;
          this.isLoadingResults = true;
          return this.nbService!.getParts(
            this.paginator.pageIndex,
            this.sort.direction
          ).pipe(
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
        this.parts = data;
      });
  }

  ngOnInit(): void {}

  openCreateAppPartDialog() {
    const createPartOptionsDialogRef = this.dialog.open(
      CreateApplicationPartComponent,
      {
        width: '600px',
        maxHeight: '70vh',
      }
    );

    createPartOptionsDialogRef
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

  openDeletePartDialog(part: Part) {
    const deletePartOptionsDialogRef = this.dialog.open(
      DeleteApplicationPartComponent,
      {
        width: '600px',
        maxHeight: '70vh',
        data: part,
      }
    );

    deletePartOptionsDialogRef
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

  openOptionsDialog(part: Part) {
    const updatePartOptionsDialogRef = this.dialog.open(
      ApplicationOptionsComponent,
      {
        width: '600px',
        maxHeight: '70vh',
        data: part,
      }
    );

    updatePartOptionsDialogRef
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
