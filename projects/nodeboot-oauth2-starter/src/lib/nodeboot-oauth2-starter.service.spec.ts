import { TestBed } from '@angular/core/testing';

import { NodebootOauth2StarterService } from './nodeboot-oauth2-starter.service';

describe('NodebootOauth2StarterService', () => {
  let service: NodebootOauth2StarterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodebootOauth2StarterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
