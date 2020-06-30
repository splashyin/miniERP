import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
      { path: 'in-app-purchase', loadChildren: '../in-app-purchase/in-app-purchase.module#InAppPurchasePageModule' },
      { path: 'history', loadChildren: '../history/history.module#HistoryPageModule' },
      { path: 'cancelled-jobs', loadChildren: '../cancelled-jobs/cancelled-jobs.module#CancelledJobsPageModule' },
      { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
      { path: 'about-us', loadChildren: '../about-us/about-us.module#AboutUsPageModule' },
      { path: 'quotation', loadChildren: '../quotation/quotation.module#QuotationPageModule' },
      { path: 'job', loadChildren: '../job/job.module#JobPageModule' },
      { path: 'invoice', loadChildren: '../invoice/invoice.module#InvoicePageModule' }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
