import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChoreographieComponent } from './add-choreographie.component';

describe('AddChoreographieComponent', () => {
  let component: AddChoreographieComponent;
  let fixture: ComponentFixture<AddChoreographieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChoreographieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChoreographieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
