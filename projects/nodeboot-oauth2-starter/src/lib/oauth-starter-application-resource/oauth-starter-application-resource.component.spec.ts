import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthStarterApplicationResourceComponent } from './oauth-starter-application-resource.component';

describe('OauthStarterApplicationResourceComponent', () => {
  let component: OauthStarterApplicationResourceComponent;
  let fixture: ComponentFixture<OauthStarterApplicationResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OauthStarterApplicationResourceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthStarterApplicationResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
