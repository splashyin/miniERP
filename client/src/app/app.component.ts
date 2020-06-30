import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AmplifyService } from 'aws-amplify-angular';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  registration: any;
  amplifyService: AmplifyService;

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    amplify: AmplifyService,
    events: Events
  ) {
    this.initializeApp();

    this.amplifyService = amplify;
    events.subscribe('data:AuthState', async (data) => {
      if (data.loggedIn) {
        this.router.navigate(['menu']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
    });
  }
}
