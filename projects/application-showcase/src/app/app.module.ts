import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {JwtTokenInterceptor, SmplWalletCoreModule} from '@smpl/smpl-wallet-core';
import {WalletComponent} from './components/wallet/wallet.component';
import {OpenComponent} from './components/open/open.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {KeycloakOptions} from 'keycloak-angular';

const keycloakOptions: KeycloakOptions = {
  config: {
    url: 'http://keycloak:8080/auth',
    realm: 'SmplFinance',
    clientId: 'smpl-angular-client',
  },
  initOptions: {
    onLoad: 'check-sso',
  },
  enableBearerInterceptor: true,
  bearerExcludedUrls: [],
}

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    OpenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmplWalletCoreModule.forRoot(
      {
        keycloakOptions: keycloakOptions,
        queryUrl: new URL('http://localhost:1317'),
        txUrl: new URL('http://localhost:1317'),
        vaultChainWalletServiceUrl: new URL('http://localhost:1317'),
        smplSecretsVaultFaucetUrl: new URL('http://localhost:1313/http://0.0.0.0:4500')
      }
    ),
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
