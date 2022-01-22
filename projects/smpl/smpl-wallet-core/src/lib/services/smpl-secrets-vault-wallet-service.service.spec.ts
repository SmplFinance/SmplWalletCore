import { TestBed } from '@angular/core/testing';

import { SmplSecretsVaultWalletServiceService } from './smpl-secrets-vault-wallet-service.service';

describe('SmplSecretsVaultWalletServiceService', () => {
  let service: SmplSecretsVaultWalletServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmplSecretsVaultWalletServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
