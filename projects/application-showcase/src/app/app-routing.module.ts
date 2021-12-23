import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WalletComponent} from './components/wallet/wallet.component';
import {SmplAuthGuardGuard} from '@smpl/smpl-wallet-core';
import {OpenComponent} from './components/open/open.component';

const routes: Routes = [
  {path: 'wallet', canActivate: [SmplAuthGuardGuard], component: WalletComponent},
  {path: 'open', component: OpenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
