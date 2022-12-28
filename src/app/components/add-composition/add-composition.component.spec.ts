import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompositionComponent } from './add-composition.component';

describe('AddCompositionComponent', () => {
  let component: AddCompositionComponent;
  let fixture: ComponentFixture<AddCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
