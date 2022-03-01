import { TestBed } from '@angular/core/testing';

import { SmplWalletService } from './smpl-wallet.service';

describe('SmplWalletService', () => {
  let service: SmplWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmplWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
