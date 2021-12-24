import {Component, OnInit} from '@angular/core';
import {WalletService} from '@smpl/smpl-wallet-core';
import {DirectSecp256k1HdWallet} from '@cosmjs/proto-signing';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  constructor(private walletService: WalletService, private httpClient: HttpClient) {
  }

  private wallet?: DirectSecp256k1HdWallet;

  ngOnInit(): void {
    this.walletService
      .createWallet()
      .subscribe(w => {
        console.log('wallet', w)
        console.log('accounts', w.getAccounts())
        this.wallet = w;
      })


  }

  getSecrets(): void {
    console.log('getting secret')
    this.httpClient
      .get('http://localhost:3100/api/secrets')
      .subscribe(
        {
          next: res => {
            console.log('got secrets', res)
          },
          error: error => console.log('got error', error),
          complete: () => console.log('http request completed')
        }
      )
  }

}
