import {Inject, Injectable} from '@angular/core';
import {EMPTY, map, Observable} from 'rxjs';
import {SmplWalletCoreOptionsInjectionToken} from '../configs/smpl-wallet-core-options-injection-token';
import {SmplWalletCoreOptions} from '../configs/smpl-wallet-core-options';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmplSecretsVaultWalletServiceService {

  constructor(
    private httpClient: HttpClient,
    @Inject(SmplWalletCoreOptionsInjectionToken) private config: SmplWalletCoreOptions
  ) {
  }

  sendFaucetTokens(destinationAddress: string): Observable<void> {
    return this.httpClient
      .post<{ error?: string, transfers?: { coins?: string, status?: string, error?: string }[] }>(
        this.config.smplSecretsVaultFaucetUrl.toString(),
        {
          address: destinationAddress,
          coins: ['10ssvt']
        }
      ).pipe(
        map(res => {
          if (res.error) {
            throw new Error(res.error);
          }
          const okFiltered = res.transfers?.filter(e => e.status !== 'ok') || [];
          if (okFiltered.length > 0) {
            throw new Error('Error(s): ' + okFiltered.map(e => e.error).join(', '))
          }
        })
      );
  }
}
