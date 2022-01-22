import { TestBed } from '@angular/core/testing';

import { SmplSecretsVaultService } from './smpl-secrets-vault.service';

describe('SmplSecretsVaultService', () => {
  let service: SmplSecretsVaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmplSecretsVaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
