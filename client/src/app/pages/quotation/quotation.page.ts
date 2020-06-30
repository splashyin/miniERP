import { HttpWorkerService } from 'src/app/services/http-workder.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuotationList, QuotationItem } from 'src/app/classes/quotation.class';
import { User } from 'src/app/classes/user';
import { Router } from '@angular/router';
import { Status } from 'src/app/classes/Status.enum';
import { ModalController } from '@ionic/angular';
import { QuotmodalPage } from './quotmodal.page';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.page.html',
  styleUrls: ['./quotation.page.scss'],
})
export class QuotationPage implements OnInit {
  user: User;
  usrID: string;
  quots: QuotationList | any;
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
    this.getQuots();
  }



  doRefresh(event) {
    this.getQuots();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  addQuot() {
    this.router.navigate(['menu/quotation/newquotation']);
  }

  async modify(q) {
    console.log(['modify quotation clicked'], q);
    const modal = await this.modalController.create({
      component: QuotmodalPage,
      componentProps: {
        editQuot: q
      }
    });
    modal.present();
  }

  delete(i) {
    console.log('delete quotation clicked');
  }

  getQuots() {
    let body = {
      userId: this.usrID
    };
    let quotationArray = [];
    let getQuotUrl = 'https://7yz6nvy11b.execute-api.ap-southeast-2.amazonaws.com/dev/getquot';
    this.httpWorker = new HttpWorkerService(this.http, getQuotUrl, body);
    this.httpWorker.httpPost().subscribe(
      res => {
        if (JSON.parse(res.toString())) {
          JSON.parse(res.toString()).forEach(element => {
            console.log(element);
            let quotation = new QuotationItem(element);
            // element.end_date = element.end_date.slice(0, 10);
            // quotation shows only after the expire date and state is not done
            if (new Date() <= new Date(quotation.end_date) && quotation.status == '01'){
              quotationArray.push(quotation);
            }
          });

          this.quots = new QuotationList(
            {
              userId: this.usrID,
              quotations: quotationArray
            }
          );

        } else {
          this.quots = new QuotationList(
            {
              userId: this.usrID,
              quotations: []
            }
          );
        }
      }, err => {
        console.log('fail');
      }
    );
  }


  winQuot(q) {
    q.status = Status.Win;
    this.save(q);
    this.insertJob(q);
  }

  lostQuot(q) {
    q.status = Status.Lost;
    this.save(q);
  }

  insertJob(q) {
    let url = 'https://qt5f2qg0p1.execute-api.ap-southeast-2.amazonaws.com/dev/winquot';
    let body = { quotId: q.id };
    this.httpWorker = new HttpWorkerService(this.http, url, body);
    this.httpWorker.httpPost().subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }

  save(q) {
    let updateQuotUrl = 'https://1ijm06gfsg.execute-api.ap-southeast-2.amazonaws.com/dev/updatequot';
    let body = {
      quotId: q.id,
      quotName: q.title,
      quotContent: q.description,
      processStateId: q.status,
      onsiteDate: q.start_date,
      expiryDate: q.end_date,
      customerId: q.customerId,
      noteContent: q.note,
      userId: this.usrID,
      totalDiscount: q.discount
    };
    this.httpWorker = new HttpWorkerService(this.http, updateQuotUrl, body);
    this.httpWorker.httpPost().subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }
}
