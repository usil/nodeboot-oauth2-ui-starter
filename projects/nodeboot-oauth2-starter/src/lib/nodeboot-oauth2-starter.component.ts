import { NodebootOauth2StarterService } from './nodeboot-oauth2-starter.service';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'lib-nodeboot-oauth2-starter',
  templateUrl: './nodeboot-oauth2-starter.component.html',
  styleUrls: ['./global.scss'],
})
export class NodebootOauth2StarterComponent implements OnInit {
  testTextT!: string;
  @Input() otherText!: string;
  constructor(private nbService: NodebootOauth2StarterService) {
    this.testTextT = this.nbService.apiUrl;
  }

  ngOnInit(): void {}
}
