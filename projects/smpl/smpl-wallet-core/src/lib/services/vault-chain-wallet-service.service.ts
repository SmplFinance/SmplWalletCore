import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VaultChainWalletServiceSecrets} from '../models/vault-chain-wallet-service-secrets';
import {SmplWalletCoreOptionsInjectionToken} from '../configs/smpl-wallet-core-options-injection-token';
import {SmplWalletCoreOptions} from '../configs/smpl-wallet-core-options';

@Injectable({
  providedIn: 'root'
})
export class VaultChainWalletServiceService {
  private static baseWalletPath = 'wallet';

  constructor(
    private httpClient: HttpClient,
    @Inject(SmplWalletCoreOptionsInjectionToken) private config: SmplWalletCoreOptions
  ) {
  }

  getVaultSecrets(): Observable<VaultChainWalletServiceSecrets> {
    return this.httpClient
      .get<VaultChainWalletServiceSecrets>(
        new URL(
          VaultChainWalletServiceService.baseWalletPath,
          this.config.vaultChainWalletServiceUrl.toString()
        ).toString()
      )
  }
}
