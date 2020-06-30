import { Component, OnInit } from '@angular/core';

import { HttpWorkerService } from 'src/app/services/http-workder.service';
import { HttpClient } from '@angular/common/http';
import { HistoryList, HistoryItem } from 'src/app/classes/history.class';
import { QuotationList, QuotationItem } from 'src/app/classes/quotation.class';
import { JobItem, JobList } from './../../classes/job.class';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';
import { Status } from 'src/app/classes/Status.enum';
import { ModalController } from '@ionic/angular';
// import { QuotmodalPage } from './quotmodal.page';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  user: User;
  usrID: string;
  quot_historys: HistoryList | any;
  job_historys: HistoryList | any;
  httpWorker: HttpWorkerService;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await Auth.currentUserInfo().then(
      user => {
        this.usrID = user.attributes.sub;
      }
    );
    this.getQuotHistorys();
  }

  doRefresh(event) {
    this.getQuotHistorys();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }



  getQuotHistorys() {
    let body = {
      userId: this.usrID
    };
    let qutoHistoryArray = [];
    let getQuotUrl = 'https://7yz6nvy11b.execute-api.ap-southeast-2.amazonaws.com/dev/getquot';
    this.httpWorker = new HttpWorkerService(this.http, getQuotUrl, body);
    this.httpWorker.httpPost().subscribe(
      res => {
        if (JSON.parse(res.toString())) {
          JSON.parse(res.toString()).forEach(element => {
            console.log(element);
            let quotation = new QuotationItem(element);
            quotation.status
            // quotation history shows only before the expire date and state is done
            if (new Date() >= new Date(quotation.end_date) && (quotation.status == '03' || quotation.status == '04')){
              qutoHistoryArray.push(quotation);
            }
          });

          this.quot_historys = new HistoryList(
            {
              userId: this.usrID,
              historys: qutoHistoryArray
            }
          );

        } else {
          this.quot_historys = new HistoryList(
            {
              userId: this.usrID,
              historys: []
            }
          );
        }
      }, err => {
        console.log('fail');
      }
    );
  }


}
