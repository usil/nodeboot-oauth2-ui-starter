import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthStarterUserProfileComponent } from './oauth-starter-user-profile.component';

describe('OauthStarterUserProfileComponent', () => {
  let component: OauthStarterUserProfileComponent;
  let fixture: ComponentFixture<OauthStarterUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthStarterUserProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthStarterUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
