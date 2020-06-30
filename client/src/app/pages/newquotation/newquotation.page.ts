import { HttpWorkerService } from './../../services/http-workder.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'src/app/classes/Status.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newquotation',
  templateUrl: './newquotation.page.html',
  styleUrls: ['./newquotation.page.scss'],
})
export class NewquotationPage implements OnInit {
  myDate: string;
  userId: string;
  insertQuotUrl: string;
  // {
  //   "quotName": "Sunday job",
  //   "quotContent": "A simple job on sunday",
  //   "processStateId": "02",
  //   "onsiteDate": "2019-03-15 14:19",
  //   "expiryDate": "2019-04-05 14:19",
  //   "customerId": 3,
  //   "noteContent": "",
  //   "userId": "2",
  //   "totalDiscount": 0.8
  // }
  quot = {
    userId: this.userId,
    processStateId: Status.Open,
    title: '',
    desc: '',
    note: '',
    onsiteDate: '',
    expireDate: '',
  };
  // {
  //   "customerFirstName": "wicked",
  //   "customerLastName": "wing",
  //   "customerEmail": "Ran@hgkp.co.nz",
  //   "customerPhoneNumber": "0904273536",
  //   "customerAddressStreet": "234 albany, state highway,",
  //   "customerAddressSuburb": "greenhithe",
  //   "customerAddressTowncity": "Syndney",
  //   "customerAddressState": "AU",
  //   "customerPostcode": "0981",
  //   "userId": 2
  // }


  constructor(private router: Router, private http: HttpClient
  ) {
    this.myDate = this.calculateTime();
    this.quot.onsiteDate = this.calculateTime();
    this.quot.expireDate = this.calculateTime();
  }

  ngOnInit() {
  }

  calculateTime() {
    // create Date object for current location
    let date = new Date();
    // create new Date object for different city
    // using supplied offset
    let newdate = new Date(date.getTime() + 3600000);
    return newdate.toISOString();
  }

  addQuot() {
    this.insertQuotUrl = 'https://de4p4mjii5.execute-api.ap-southeast-2.amazonaws.com/dev/insertquot';
    let quotCopy = {
      quotName: this.quot.title,
      quotContent: this.quot.desc,
      processStateId: this.quot.processStateId,
      onsiteDate: new Date(this.quot.onsiteDate).toISOString(),
      expiryDate: new Date(this.quot.expireDate).toISOString(),
      customerId: 3,
      noteContent: this.quot.note,
      userId: '2',
      totalDiscount: 0.77
    };
    const httpWorker = new HttpWorkerService(this.http, this.insertQuotUrl, quotCopy);
    httpWorker.httpPost().subscribe(
      res => {
        console.log(res);
      }
    );
    this.resetQuotation();
  }

  resetQuotation() {
    this.quot = {
      userId: this.userId,
      processStateId: Status.Open,
      title: '',
      desc: '',
      note: '',
      onsiteDate: new Date().toISOString(),
      expireDate: new Date().toISOString(),
    };
  }

  back() {
    this.router.navigate(['menu/quotation']);
  }
}
