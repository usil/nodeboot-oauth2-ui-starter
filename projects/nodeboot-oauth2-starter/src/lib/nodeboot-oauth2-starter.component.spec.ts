import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodebootOauth2StarterComponent } from './nodeboot-oauth2-starter.component';

describe('NodebootOauth2StarterComponent', () => {
  let component: NodebootOauth2StarterComponent;
  let fixture: ComponentFixture<NodebootOauth2StarterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodebootOauth2StarterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodebootOauth2StarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
