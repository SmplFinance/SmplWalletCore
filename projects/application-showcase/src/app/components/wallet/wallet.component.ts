import {Component, OnInit} from '@angular/core';
import {WalletService} from '@smpl/smpl-wallet-core';
import {DirectSecp256k1HdWallet} from '@cosmjs/proto-signing';
import {HttpClient} from '@angular/common/http';
import {enc} from 'crypto-js'
import {encrypt, decrypt} from 'crypto-js/aes'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  constructor(private walletService: WalletService, private httpClient: HttpClient) {
  }

  private wallet?: DirectSecp256k1HdWallet;
  key?: string;
  thingToEncrypt?: string;

  ngOnInit(): void {
    this.walletService
      .createWallet()
      .subscribe(async w => {
        console.log('wallet', w)
        console.log('accounts', await w.getAccounts())
        this.wallet = w;
      })
  }

  getSecrets(): void {
    console.log('getting secret')
    this.httpClient
      .get('http://localhost:8081/wallet')
      .subscribe(
        {
          next: (res: any) => {
            console.log('got secrets', res)
            this.walletService.salt = res['secret']
            localStorage.setItem('vaultAddress', res['walletAddress'])
          },
          error: error => console.log('got error', error),
          complete: () => console.log('http request completed')
        }
      )
  }

  encryptWallet(): void {
    console.log('thing to encrypt', this.thingToEncrypt);
    console.log('key to encrypt', this.key);
    const encrypted = encrypt(this.thingToEncrypt || 'bob', this.key || 'bob');
    console.log('encrypted data', encrypted.toString());
    const decrypted = decrypt(encrypted, this.key || 'bob')
    console.log('decrypted data', decrypted.toString(enc.Utf8));
  }

}
