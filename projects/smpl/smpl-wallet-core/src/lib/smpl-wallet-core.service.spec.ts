import { TestBed } from '@angular/core/testing';

import { SmplWalletCoreService } from './smpl-wallet-core.service';

describe('SmplWalletCoreService', () => {
  let service: SmplWalletCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmplWalletCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
