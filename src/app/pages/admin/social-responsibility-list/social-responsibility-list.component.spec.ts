import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialResponsibilityListComponent } from './social-responsibility-list.component';

describe('SocialResponsibilityListComponent', () => {
  let component: SocialResponsibilityListComponent;
  let fixture: ComponentFixture<SocialResponsibilityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialResponsibilityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialResponsibilityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
