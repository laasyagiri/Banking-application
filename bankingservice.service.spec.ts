import { TestBed } from '@angular/core/testing';

import { BankingserviceService } from './bankingservice.service';

describe('BankingserviceService', () => {
  let service: BankingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
