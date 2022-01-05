import {Injectable} from '@angular/core';
import {DirectSecp256k1HdWallet} from '@cosmjs/proto-signing';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  salt?: string

  constructor() {
  }

  createWallet(): Observable<DirectSecp256k1HdWallet> {
    return from(DirectSecp256k1HdWallet.generate(18, {prefix: 'smpl'}))
  }
}
