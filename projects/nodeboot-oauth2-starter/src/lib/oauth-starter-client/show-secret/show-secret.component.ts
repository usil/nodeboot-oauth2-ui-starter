import { Subscription } from 'rxjs';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Client,
  NodebootOauth2StarterService,
} from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-show-secret',
  templateUrl: './show-secret.component.html',
  styleUrls: ['./show-secret.component.scss'],
})
export class ShowSecretComponent implements OnInit, OnDestroy {
  hide = true;
  clientSecret!: string;
  errorMessage!: string;
  subscription!: Subscription;

  constructor(
    private nbService: NodebootOauth2StarterService,
    public dialogRef: MatDialogRef<ShowSecretComponent>,
    @Inject(MAT_DIALOG_DATA) public client: Client
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.subscription = this.nbService.getSecret(this.client.id).subscribe({
      error: (err) => {
        this.dialogRef.disableClose = false;
        if (err.error) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Unknown Error';
        }
      },
      next: (res) => {
        this.dialogRef.disableClose = false;
        this.clientSecret = res.content.clientSecret;
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
