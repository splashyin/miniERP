import { QuotmodalPageModule } from './pages/quotation/quotmodal.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmplifyAngularModule, AmplifyService, AmplifyIonicModule } from 'aws-amplify-angular';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ProfileHelper } from './helpers/profileHelper';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AmplifyAngularModule,
    AmplifyIonicModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    QuotmodalPageModule
  ],
  providers: [
    ProfileHelper,
    AmplifyService,
    StatusBar,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
