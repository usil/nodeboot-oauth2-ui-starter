import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthStarterRolesComponent } from './oauth-starter-roles.component';

describe('OauthStarterRolesComponent', () => {
  let component: OauthStarterRolesComponent;
  let fixture: ComponentFixture<OauthStarterRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthStarterRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthStarterRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
