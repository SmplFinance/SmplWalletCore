import {Component, OnInit} from '@angular/core';
import {WalletService} from '@smpl/smpl-wallet-core';
import {DirectSecp256k1HdWallet, EncodeObject, Registry} from '@cosmjs/proto-signing';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {enc} from 'crypto-js'
import {decrypt, encrypt} from 'crypto-js/aes'
import {catchError, EMPTY, filter, forkJoin, from, map, mergeMap, of} from 'rxjs';
import {defaultRegistryTypes, GasPrice, SigningStargateClient} from '@cosmjs/stargate';
import {MsgStoreWallet} from '../../proto-generated/smplsecretsvaultchain/tx';

const typeUrl = '/SmplEcosystem.smplsecretsvaultchain.smplsecretsvaultchain.MsgStoreWallet';

interface TypedEncodeObject<T> extends EncodeObject {
  value: T
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  constructor(private walletService: WalletService, private httpClient: HttpClient) {
  }

  private vaultWallet?: DirectSecp256k1HdWallet;
  private smplWallet?: DirectSecp256k1HdWallet;
  key?: string;
  thingToEncrypt?: string;
  signingStargateClient!: SigningStargateClient;
  balances?: any[]

  ngOnInit(): void {
    // this.walletService
    //   .createWallet()
    //   .subscribe(async w => {
    //     console.log('wallet', w)
    //     console.log('accounts', await w.getAccounts())
    //   })
  }

  getSecrets(): void {
    console.log('getting secret')

    this.httpClient
      .get<{ id: string, mnemonic: string[], passphrase: string }>('http://localhost:8081/wallet')
      .pipe(
        mergeMap(secrets => {
          this.walletService.salt = secrets.passphrase
          return forkJoin([
            of(secrets),
            this.walletService.importWallet(secrets.mnemonic.join(' '), 'ssvt')
          ]);
        }),
        mergeMap(([secrets, wallet]) => {
          const myReg = new Registry([...defaultRegistryTypes, [typeUrl, MsgStoreWallet]])
          return forkJoin(
            [
              from(wallet.getAccounts()).pipe(map(accounts => accounts[0])),
              of(wallet),
              of(secrets),
              from(SigningStargateClient.connectWithSigner(
                'http://localhost:26657',
                wallet,
                {
                  prefix: 'ssvt',
                  gasPrice: GasPrice.fromString('0ssvt'),
                  registry: myReg
                }
              ))
            ]
          )
        }),
      )
      .subscribe(
        {
          next: ([mainAccount, wallet, secrets, signingStargateClient]) => {
            this.signingStargateClient = signingStargateClient
            // this.signingStargateClient.registry.register(typeUrl, WalletStorage)
            this.vaultWallet = wallet;
            console.log('got client', this.signingStargateClient)
            console.log('got account', mainAccount)
            console.log('got wallet', wallet)
            console.log('got secrets', secrets)
            localStorage.setItem('vaultAddress', mainAccount.address.trim())
          },
          error: error => console.log('got error', error),
          complete: () => console.log('http request completed')
        }
      )
  }


  async getVaultWallet(): Promise<void> {
    const [mainAccount] = this.vaultWallet ? await this.vaultWallet?.getAccounts() : [];
    if (!mainAccount) {
      console.log('could not find mainAccount')
      return;
    }

    this.httpClient
      .get('http://localhost:1313/http://localhost:1317/SmplEcosystem/smplsecretsvaultchain/smplsecretsvaultchain/wallets/' + mainAccount.address.trim())
      .pipe(
        catchError((err: HttpErrorResponse, caught) => {
          if (err.status !== 400) throw(err);

          return from(
            this.vaultWallet ? this.vaultWallet.getAccounts() : EMPTY
          ).pipe(
            filter(accounts => !!accounts),
            map(accounts => accounts[0]),
            mergeMap(
              mainAccount => {
                const msg: TypedEncodeObject<MsgStoreWallet> = {
                  typeUrl,
                  value: MsgStoreWallet.fromPartial(
                    {
                      creator: mainAccount.address.trim(),
                      name: 'smplWallet',
                      wallet: {
                        prefix: 'smpl',
                        mnemonic: ['one', 'two', 'three'],
                        chainSymbol: 'SMPL'
                      },
                      passphrase: 'bob'
                    }
                  )
                };
                const fee = {
                  amount: [{denom: 'ssvt', amount: '0'}],
                  gas: '0'
                }

                console.log('account address', mainAccount.address)
                return from(this.signingStargateClient.signAndBroadcast(
                  mainAccount.address.trim(),
                  [msg],
                  'auto',
                  'cool'
                ))
              }
            )
          )
        }),
        filter((wallets: any) => {
          console.log('got wallets', wallets)
          console.log('got smpl wallets', wallets?.wallets?.walletStorageMap?.smplWallet)
          return !!(wallets?.wallets?.walletStorageMap?.smplWallet?.wallet);
        }),
        map(wallets => wallets.wallets.walletStorageMap.smplWallet.wallet),
        mergeMap(wallet => this.walletService.importWallet(wallet.mnemonic.join(' '), 'smpl')),
        mergeMap(async wallet => (await wallet.getAccounts())[0]),
        mergeMap(smplAccount => this.httpClient.get('http://localhost:1313/http://testnet-validator1.smplfinance.com:1317/cosmos/bank/v1beta1/balances/' + smplAccount.address))
      )
      .subscribe((ret:any) => {
        console.log('smpl wallet is', ret)
        this.balances = ret.balances;
      });

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
