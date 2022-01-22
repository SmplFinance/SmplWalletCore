import {Inject, ModuleWithProviders, NgModule} from '@angular/core';
import {SmplWalletCoreComponent} from './smpl-wallet-core.component';
import {KeycloakService} from 'keycloak-angular';
import {SmplAuthGuardGuard} from './guards/smpl-auth-guard.guard';
import {HttpClientModule} from '@angular/common/http';
import {SmplWalletCoreOptions} from './configs/smpl-wallet-core-options';
import {SmplWalletCoreOptionsInjectionToken} from './configs/smpl-wallet-core-options-injection-token';
import {CosmosWalletService} from './services/cosmos-wallet.service';


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
    CosmosWalletService,
  ]
})
export class SmplWalletCoreModule {
  public static forRoot(config: SmplWalletCoreOptions): ModuleWithProviders<SmplWalletCoreModule> {
    return {
      ngModule: SmplWalletCoreModule,
      providers: [
        {
          provide: SmplWalletCoreOptionsInjectionToken,
          useValue: config
        }
      ]
    }
  }

  constructor(
    private keycloakService: KeycloakService,
    @Inject(SmplWalletCoreOptionsInjectionToken) private config: SmplWalletCoreOptions
  ) {
    // {
    //   config: {
    //     url: 'http://localhost:8080/auth',
    //       realm: 'SmplFinance',
    //       clientId: 'smpl-angular-client',
    //   },
    //   initOptions: {
    //     onLoad: 'login-required',
    //   },
    //   enableBearerInterceptor: true,
    //     bearerExcludedUrls: [],
    // }

    keycloakService
      .init(config.keycloakOptions)
      .then(r => console.log('keyclaok initiated', r));
  }
}
