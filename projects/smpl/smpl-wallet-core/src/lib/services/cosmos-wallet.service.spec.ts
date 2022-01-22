import { TestBed } from '@angular/core/testing';

import { CosmosWalletService } from './cosmos-wallet.service';

describe('WalletService', () => {
  let service: CosmosWalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CosmosWalletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
