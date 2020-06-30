import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { formatDate } from '@angular/common';
import { AlertController, NavController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from 'aws-amplify';
import { QuotationItem } from 'src/app/classes/quotation.class';
import { Status } from 'src/app/classes/Status.enum';
import { Customer } from 'src/app/classes/customer.class';
import { HttpWorkerService } from 'src/app/services/http-workder.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  insertQuotUrl: string;
  user: User = new User();
  posturl: string;

  // calendar event
  // event = job = quotation
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false,
    note: ''
  };

  // customer
  customer = {
    first_name: '',
    last_name: '',
    phone: '',
    location: '',
    email: ''
  };

  // quotation item
  item = {
    name: '',
    description: '',
    quantity: '',
    unit: '',
    rate: '',
    gst: '',
    total: ''
  };


  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  viewTitle = '';

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale) { }

  async ngOnInit() {
    // retrieve current user's UDID
    await Auth.currentUserInfo().then(
      user => {
        this.user.getUser(user);
      }
    );

    this.resetEvent();
  }

  getEvent() {
    // get all events of the current user using lambda function
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let body = {
      user: this.user.userId,
      title: this.event.title,
      description: this.event.desc,
      startTime: new Date(this.event.startTime).toISOString(),
      endTime: new Date(this.event.endTime).toISOString(),
    };
  }

  addEvent() {
    let eventCopy = {
      title: this.event.title,
      desc: this.event.desc,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay
    };

    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      note: ''
    };
  }

  async onEventSelected(event) {
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    let now = this.calendar.currentDate;
    if (this.calendar.mode === 'month') {
      this.calendar.currentDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
    } else if (this.calendar.mode === 'week') {
      this.calendar.currentDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 7));
    } else {
      this.calendar.currentDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));
    }
  }

  next() {
    let now = this.calendar.currentDate;
    if (this.calendar.mode === 'month') {
      this.calendar.currentDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
    } else if (this.calendar.mode === 'week') {
      this.calendar.currentDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 7));
    } else {
      this.calendar.currentDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    }
  }

  addQuot() {
    this.addCustomer();
    const customerID = 2; // replace with return value
    let quot = {
      quotName: this.event.title,
      quotContent: this.event.desc,
      processStateId: Status.Open,
      onsiteDate: this.event.startTime,
      expiryDate: this.event.endTime,
      customerId: customerID,
      noteContent: this.event.note,
      userId: this.user.userId,
      totalDiscount: 0.77
    };
    this.insertQuotUrl = 'https://de4p4mjii5.execute-api.ap-southeast-2.amazonaws.com/dev/insertquot';
    const httpWorker = new HttpWorkerService(this.http, this.insertQuotUrl, quot);
    httpWorker.httpPost().subscribe(
      res => {
        console.log(res);
      }
    );
    this.addEvent();
  }

  addInvoice() {
    console.log('add invoice clicked');
  }

  addCustomer() {
    let customer = new Customer(this.http);
    customer.setFirstName(this.customer.first_name);
    customer.setLastName(this.customer.last_name);
    customer.setEmail(this.customer.email);
    customer.setPhone(this.customer.phone);
    customer.setAddress(this.customer.location);
    customer.setUserID(this.user.userId);
    customer.pushToBackend(customer);
  }


  today() {
    this.calendar.currentDate = new Date();
  }

  gotoQuotation() {
    this.nav.navigateForward('/menu/quotation');
  }

  gotoJob() {
    this.nav.navigateForward('menu/job');
  }

  gotoInvoice() {
    this.nav.navigateForward('menu/invoice');
  }
}
