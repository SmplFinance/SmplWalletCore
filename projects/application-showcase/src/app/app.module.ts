import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SmplWalletCoreModule} from '@smpl/smpl-wallet-core';
import {WalletComponent} from './components/wallet/wallet.component';
import {OpenComponent} from './components/open/open.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtTokenInterceptor} from '@smpl/smpl-wallet-core';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    OpenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmplWalletCoreModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
