import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApplicationPartComponent } from './delete-application-part.component';

describe('DeleteApplicationPartComponent', () => {
  let component: DeleteApplicationPartComponent;
  let fixture: ComponentFixture<DeleteApplicationPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteApplicationPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteApplicationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
