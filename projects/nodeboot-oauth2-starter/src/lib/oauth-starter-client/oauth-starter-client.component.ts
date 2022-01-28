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
  Client,
  ClientCreateContent,
  NodebootOauth2StarterService,
} from '../nodeboot-oauth2-starter.service';
import { AddClientRolesComponent } from './add-client-roles/add-client-roles.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { ShowTokenComponent } from './show-token/show-token.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { ViewClientRolesComponent } from './view-client-roles/view-client-roles.component';

@Component({
  selector: 'lib-oauth-starter-client',
  templateUrl: './oauth-starter-client.component.html',
  styleUrls: ['./oauth-starter-client.component.scss'],
})
export class OauthStarterClientComponent implements OnInit {
  clients!: Client[];
  errorMessage!: string | undefined;
  displayedColumns: string[] = ['id', 'name', 'identifier', 'roles', 'edit'];

  resultsLength = 0;
  isLoadingResults = true;

  reload = new BehaviorSubject<number>(0);

  clientDataSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private nbService: NodebootOauth2StarterService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.clientDataSubscription = merge(
      this.sort.sortChange,
      this.paginator.page,
      this.reload
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.errorMessage = undefined;
          this.isLoadingResults = true;
          return this.nbService!.getClients(
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
        this.clients = data;
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.clientDataSubscription?.unsubscribe();
    this.sort.sortChange.complete();
  }

  openCreateClientDialog() {
    const createClientDialogRef = this.dialog.open(CreateClientComponent, {
      width: '600px',
      maxHeight: '70vh',
    });
    createClientDialogRef
      .afterClosed()
      .pipe(first())
      .subscribe({
        next: (res: ClientCreateContent) => {
          if (res) {
            this.dialog.open(ShowTokenComponent, {
              width: '600px',
              maxHeight: '70vh',
              data: res,
            });
            this.reload.next(this.reload.value + 1);
          }
        },
      });
  }

  openViewRolesDialog(client: Client) {
    this.dialog.open(ViewClientRolesComponent, {
      width: '600px',
      maxHeight: '70vh',
      data: client,
    });
  }

  openUpdateRolesDialog(client: Client) {
    const updateRolesDialogRef = this.dialog.open(AddClientRolesComponent, {
      width: '600px',
      maxHeight: '70vh',
      data: client,
    });

    updateRolesDialogRef
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

  openUpdateClientDialog(client: Client) {
    const updateClientDialogRef = this.dialog.open(UpdateClientComponent, {
      width: '600px',
      maxHeight: '70vh',
      data: client,
    });

    updateClientDialogRef
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

  openDialogDeleteClient(client: Client) {
    const updateRolesDialogRef = this.dialog.open(DeleteClientComponent, {
      width: '600px',
      maxHeight: '70vh',
      data: client,
    });

    updateRolesDialogRef
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
