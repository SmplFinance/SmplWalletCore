import {NgModule} from '@angular/core';
import {SmplWalletCoreComponent} from './smpl-wallet-core.component';
import {KeycloakService} from 'keycloak-angular';
import {SmplAuthGuardGuard} from './guards/smpl-auth-guard.guard';
import {WalletService} from './services/wallet.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtTokenInterceptor} from './interceptors/jwt-token.interceptor';


@NgModule({
  declarations: [
    SmplWalletCoreComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    SmplWalletCoreComponent,
  ],
  providers: [
    KeycloakService,
    SmplAuthGuardGuard,
    WalletService,
  ]
})
export class SmplWalletCoreModule {
  constructor(private keycloakService: KeycloakService) {
    keycloakService
      .init({
        config: {
          url: 'http://keycloak:8080/auth',
          realm: 'SmplFinance',
          clientId: 'smpl-angular-client',
        },
        initOptions: {
          onLoad: 'login-required',
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: [],
      })
      .then(r => console.log('keyclaok initiated', r));
  }
}
