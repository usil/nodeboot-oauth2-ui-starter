import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApplicationPartComponent } from './create-application-part.component';

describe('CreateApplicationPartComponent', () => {
  let component: CreateApplicationPartComponent;
  let fixture: ComponentFixture<CreateApplicationPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateApplicationPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApplicationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
