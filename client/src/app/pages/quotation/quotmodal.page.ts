import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { QuotationItem } from 'src/app/classes/quotation.class';
import { HttpWorkerService } from 'src/app/services/http-workder.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quotmodal',
  templateUrl: './quotmodal.page.html',
  styleUrls: ['./quotmodal.page.scss'],
})
export class QuotmodalPage implements OnInit {

  @Input() editQuot: QuotationItem;

  quot: QuotationItem;
  httpWorker: HttpWorkerService;

  constructor(private http: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
    this.quot = Object.assign({}, this.editQuot);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  save() {
    let updateQuotUrl = 'https://1ijm06gfsg.execute-api.ap-southeast-2.amazonaws.com/dev/updatequot';
    let body = {
      quotId: this.quot.id,
      quotName: this.quot.title,
      quotContent: this.quot.description,
      processStateId: this.quot.status,
      onsiteDate: this.quot.start_date,
      expiryDate: this.quot.end_date,
      customerId: this.quot.customerId,
      noteContent: this.quot.note,
      userId: '2',
      totalDiscount: this.quot.discount
    };
    this.httpWorker = new HttpWorkerService(this.http, updateQuotUrl, body);
    this.httpWorker.httpPost().subscribe(res => {
      if (res) {
        console.log(res);
        this.closeModal();
      }
    });
  }
}

