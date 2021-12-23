import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SmplWalletCoreModule} from '@smpl/smpl-wallet-core';
import { WalletComponent } from './components/wallet/wallet.component';
import { OpenComponent } from './components/open/open.component';

@NgModule({
  declarations: [
    AppComponent,
    WalletComponent,
    OpenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SmplWalletCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
