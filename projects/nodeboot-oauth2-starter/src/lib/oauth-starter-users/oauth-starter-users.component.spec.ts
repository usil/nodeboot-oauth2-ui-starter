import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthStarterUsersComponent } from './oauth-starter-users.component';

describe('OauthStarterUsersComponent', () => {
  let component: OauthStarterUsersComponent;
  let fixture: ComponentFixture<OauthStarterUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthStarterUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthStarterUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
