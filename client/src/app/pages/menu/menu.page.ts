import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { User } from 'src/app/classes/user';
import { Company } from 'src/app/classes/company';
import { Storage } from '@ionic/storage';
import { ProfileHelper } from 'src/app/helpers/profileHelper';
import { HttpWorkerService } from './../../services/http-workder.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  username: string;
  user: User;
  company: Company;

  posturl: string;
  pages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'home'
    },
    {
      title: 'Inventory',
      children: [
        {
          title: 'Quotation',
          url: '/menu/quotation',
          icon: 'alert'
        },
        {
          title: 'Job',
          url: '/menu/job',
          icon: 'hammer'
        },
        {
          title: 'Invoice',
          url: '/menu/invoice',
          icon: 'logo-usd'
        }
      ]
    },
    {
      title: 'Profile',
      url: '/menu/profile',
      icon: 'contacts'
    },
    {
      title: 'In-App Purchase',
      url: '/menu/in-app-purchase',
      icon: 'cart'
    },
    {
      title: 'History',
      url: '/menu/history',
      icon: 'clipboard'
    },
    {
      title: 'Cancelled Jobs',
      url: '/menu/cancelled-jobs',
      icon: 'list'
    },
    {
      title: 'Settings',
      url: '/menu/settings',
      icon: 'settings'
    },
    {
      title: 'About Us',
      url: '/menu/about-us',
      icon: 'thumbs-up'
    }
  ];

  selectedPath = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private profileHelper: ProfileHelper,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  async ngOnInit() {
    // Retrieve the current user...
    await Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(
      user => {
        // console.log(user); // log cognito user
        this.username = user.username;
        this.user = new User();
        this.user.getUser(user);
        // console.log(this.user);

        this.sendPostRequestGetCompany(this.user.userId);
      })
      .catch(
        err => console.log(err)
      );
    console.log("this.user", this.user);
    await this.profileHelper.saveToLocal(this.user);

  }

  async sendPostRequestGetCompany(userId) {
    console.log('sendPostRequestGetCompany');
    let selectCompanyUrl = 'https://ubm35qj1uk.execute-api.ap-southeast-2.amazonaws.com/dev/selectCompany';
    let postBody = { 'userId': userId };
    const httpWorker = new HttpWorkerService(this.http, selectCompanyUrl, postBody);
    httpWorker.httpPost().subscribe(
      res => {
        console.log(res);
        var companys = res.toString();
        this.profileHelper.saveToLocalCompanies(companys);
      }
    );
  }

  logout() {
    Auth.signOut({ global: true })
    .then(data => console.log(data))
    .catch(err => console.log(err));  }

}
