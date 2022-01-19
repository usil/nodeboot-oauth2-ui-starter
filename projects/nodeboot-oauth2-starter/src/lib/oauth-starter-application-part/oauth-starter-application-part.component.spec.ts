import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthStarterApplicationPartComponent } from './oauth-starter-application-part.component';

describe('OauthStarterApplicationPartComponent', () => {
  let component: OauthStarterApplicationPartComponent;
  let fixture: ComponentFixture<OauthStarterApplicationPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthStarterApplicationPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthStarterApplicationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
