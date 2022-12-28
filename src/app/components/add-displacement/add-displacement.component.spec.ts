import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDisplacementComponent } from './add-displacement.component';

describe('AddDisplacementComponent', () => {
  let component: AddDisplacementComponent;
  let fixture: ComponentFixture<AddDisplacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDisplacementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDisplacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
