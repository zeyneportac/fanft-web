import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocialResponsibilityComponent } from './add-social-responsibility.component';

describe('AddSocialResponsibilityComponent', () => {
  let component: AddSocialResponsibilityComponent;
  let fixture: ComponentFixture<AddSocialResponsibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocialResponsibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSocialResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
