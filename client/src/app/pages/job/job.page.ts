import { HttpWorkerService } from './../../services/http-workder.service';
import { JobItem, JobList } from './../../classes/job.class';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { Auth } from 'aws-amplify';
import { Status } from 'src/app/classes/Status.enum';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  private posturl: string;
  jobs: JobList | any;
  user: User = new User();
  httpWorker: HttpWorkerService;

  constructor(
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await Auth.currentUserInfo().then(
      user => {
        this.user.getUser(user);
      }
    );
    this.getJobs();
  }

  doRefresh(event) {
    this.getJobs();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  getJobs() {
    let body = {
      userId: this.user.userId
    };
    let jobArray = [];
    this.posturl = 'https://7r2ez16b85.execute-api.ap-southeast-2.amazonaws.com/dev/getjobs';
    this.httpWorker = new HttpWorkerService(this.http, this.posturl, body);
    this.httpWorker.httpPost().subscribe(
      res => {
        if (JSON.parse(res.toString())) {
          JSON.parse(res.toString()).forEach(j => {
            let job = new JobItem(j, this.http);
            console.log(job);

            if (new Date() <= new Date(job.getEndDate()) && job.getStatus() == "01"){
              jobArray.push(job);
            }
          });

          this.jobs = new JobList(
            {
              userId: this.user.userId,
              jobs: jobArray
            }
          );
        } else {
          this.jobs = new JobList(
            {
              userId: this.user.userId,
              jobs: []
            }
          );
        }
      }, err => {
        console.log('fail');
      }
    );
  }

  finishJob(job: JobItem) {
    job.setStatus(Status.Win);
    this.save(job);
  }

  lostJob(job: JobItem) {
    job.setStatus(Status.Lost);
    this.save(job);
    job.cancel(job.getJobId());
  }

  save(job: JobItem) {
    job.update(job, this.user.userId);
  }
}
