import { TestBed } from '@angular/core/testing';

import { SocialResponsibilityService } from './social-responsibility.service';

describe('SocialResponsibilityService', () => {
  let service: SocialResponsibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialResponsibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
