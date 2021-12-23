import {Component, OnInit} from '@angular/core';
import {WalletService} from '@smpl/smpl-wallet-core';
import {DirectSecp256k1HdWallet} from '@cosmjs/proto-signing';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  constructor(private walletService: WalletService, private authService: KeycloakService) {
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

    this.authService
      .getToken()
      .then(t => console.log('token is ', t))
  }

}
