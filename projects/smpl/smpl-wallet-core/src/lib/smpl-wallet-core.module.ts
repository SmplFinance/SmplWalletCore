import {NgModule} from '@angular/core';
import {SmplWalletCoreComponent} from './smpl-wallet-core.component';
import {KeycloakService} from 'keycloak-angular';
import {SmplAuthGuardGuard} from './guards/smpl-auth-guard.guard';
import {WalletService} from './services/wallet.service';


@NgModule({
  declarations: [
    SmplWalletCoreComponent
  ],
  imports: [],
  exports: [
    SmplWalletCoreComponent,
  ],
  providers: [KeycloakService, SmplAuthGuardGuard, WalletService]
})
export class SmplWalletCoreModule {
  constructor(private keycloakService: KeycloakService) {
    keycloakService
      .init({
        config: {
          url: 'http://localhost:8080/auth',
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
