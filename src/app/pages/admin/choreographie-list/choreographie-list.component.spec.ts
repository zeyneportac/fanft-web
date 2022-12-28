import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoreographieListComponent } from './choreographie-list.component';

describe('ChoreographieListComponent', () => {
  let component: ChoreographieListComponent;
  let fixture: ComponentFixture<ChoreographieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoreographieListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoreographieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
