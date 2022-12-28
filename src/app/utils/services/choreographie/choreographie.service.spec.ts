import { TestBed } from '@angular/core/testing';

import { ChoreographieService } from './choreographie.service';

describe('ChoreographieService', () => {
  let service: ChoreographieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoreographieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
