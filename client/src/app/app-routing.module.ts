import { AuthRouteGuardService } from './services/auth-route-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'menu',
    canActivate: [AuthRouteGuardService],
    loadChildren: './pages/menu/menu.module#MenuPageModule'
  },
  {
    path: 'menu/quotation/newquotation',
    canActivate: [AuthRouteGuardService],
    loadChildren: './pages/newquotation/newquotation.module#NewquotationPageModule'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
