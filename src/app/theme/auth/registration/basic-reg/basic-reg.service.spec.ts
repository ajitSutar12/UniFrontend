import { TestBed } from '@angular/core/testing';

import { BasicRegService } from './basic-reg.service';

describe('BasicRegService', () => {
  let service: BasicRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
