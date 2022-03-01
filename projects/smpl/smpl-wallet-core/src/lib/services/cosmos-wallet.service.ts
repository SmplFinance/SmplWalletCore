import {Injectable} from '@angular/core';
import {DirectSecp256k1HdWallet} from '@cosmjs/proto-signing';
import {catchError, from, map, mergeMap, Observable, tap} from 'rxjs';
import {StargateClient} from '@cosmjs/stargate';

const smplPrefix = 'smpl'

@Injectable({
  providedIn: 'root'
})
export class CosmosWalletService {
  constructor() {
  }

  createWallet(prefix: string = smplPrefix): Observable<DirectSecp256k1HdWallet> {
    return from(DirectSecp256k1HdWallet.generate(18, {prefix}))
  }

  importWallet(mnemonic: string, prefix: string = smplPrefix): Observable<DirectSecp256k1HdWallet> {
    return from(DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {prefix}))
  }

  accountExists(address: string, endpoint: URL): Observable<boolean> {
    return this.nonSigningClient(endpoint)
      .pipe(
        tap(() => console.log('address, endpoint', address, endpoint)),
        mergeMap(client => from(client.getAccount(address))),
        catchError(err => {
          console.log('error trying to receive account', err)
          throw err;
        }),
        map(account => !!account),
      )
  }

  nonSigningClient(endpoint: URL): Observable<StargateClient> {
    return from(StargateClient.connect(endpoint.toString()))
  }
}
