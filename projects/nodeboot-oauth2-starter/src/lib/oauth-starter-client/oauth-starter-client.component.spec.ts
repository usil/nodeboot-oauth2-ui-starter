import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthStarterClientComponent } from './oauth-starter-client.component';

describe('OauthStarterClientComponent', () => {
  let component: OauthStarterClientComponent;
  let fixture: ComponentFixture<OauthStarterClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OauthStarterClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthStarterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
