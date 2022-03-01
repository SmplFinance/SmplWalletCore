import {APP_INITIALIZER, Inject, ModuleWithProviders, NgModule} from '@angular/core';
import {SmplWalletCoreComponent} from './smpl-wallet-core.component';
import {KeycloakService} from 'keycloak-angular';
import {SmplAuthGuardGuard} from './guards/smpl-auth-guard.guard';
import {HttpClientModule} from '@angular/common/http';
import {SmplWalletCoreOptions} from './configs/smpl-wallet-core-options';
import {SmplWalletCoreOptionsInjectionToken} from './configs/smpl-wallet-core-options-injection-token';
import {CosmosWalletService} from './services/cosmos-wallet.service';

const initializeKeycloak = (keycloak: KeycloakService, config: SmplWalletCoreOptions) => {
  return () =>
    keycloak.init(config.keycloakOptions);
}


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
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeKeycloak,
          multi: true,
          deps: [KeycloakService, SmplWalletCoreOptionsInjectionToken]
        }
      ]
    }
  }
}
