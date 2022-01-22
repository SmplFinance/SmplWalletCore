import { TestBed } from '@angular/core/testing';

import { VaultChainWalletServiceService } from './vault-chain-wallet-service.service';

describe('VaultChainWalletServiceService', () => {
  let service: VaultChainWalletServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaultChainWalletServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
