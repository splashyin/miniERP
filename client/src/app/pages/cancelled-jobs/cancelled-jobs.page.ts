import { Component, OnInit } from '@angular/core';

import { HttpWorkerService } from 'src/app/services/http-workder.service';
import { HttpClient } from '@angular/common/http';
import { HistoryList, HistoryItem } from 'src/app/classes/history.class';
import { JobItem, JobList } from './../../classes/job.class';
import { User } from 'src/app/classes/user';
// import { QuotmodalPage } from './quotmodal.page';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-cancelled-jobs',
  templateUrl: './cancelled-jobs.page.html',
  styleUrls: ['./cancelled-jobs.page.scss'],
})

export class CancelledJobsPage implements OnInit {

  user: User;
  usrID: string;
  cancelled_jobs: JobList | any;
  httpWorker: HttpWorkerService;

  constructor(
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await Auth.currentUserInfo().then(
      user => {
        this.usrID = user.attributes.sub;
      }
    );
    this.getCancelledJobs();
  }

  doRefresh(event) {
    this.getCancelledJobs();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  getCancelledJobs() {
    let body = {
      userId: this.usrID
    };
    let cancelledJobArray = [];
    let posturl = 'https://7r2ez16b85.execute-api.ap-southeast-2.amazonaws.com/dev/getjobs';
    this.httpWorker = new HttpWorkerService(this.http, posturl, body);
    this.httpWorker.httpPost().subscribe(
      res => {
        if (JSON.parse(res.toString())) {
          JSON.parse(res.toString()).forEach(j => {
            let job = new JobItem(j, this.http);
            console.log(job);
            if (new Date() >= new Date(job.getEndDate()) || job.getStatus() == "02"){
              cancelledJobArray.push(job);
            }
          });
          this.cancelled_jobs = new JobList(
            {
              userId: this.usrID,
              jobs: cancelledJobArray,
            }
          );
        } else {
          this.cancelled_jobs = new JobList(
            {
              userId: this.usrID,
              jobs: [],
            }
          );
        }
      }, err => {
        console.log('fail');
      }
    );
  }

}
