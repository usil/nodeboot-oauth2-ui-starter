import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientCreateContent } from '../../nodeboot-oauth2-starter.service';

@Component({
  selector: 'lib-show-token',
  templateUrl: './show-token.component.html',
  styleUrls: ['./show-token.component.scss'],
})
export class ShowTokenComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ShowTokenComponent>,
    @Inject(MAT_DIALOG_DATA) public clientResult: ClientCreateContent
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
