import { Item } from './item.class';
import { Status } from './Status.enum';
import { QuotationItem } from './quotation.class';
import { HttpWorkerService } from '../services/http-workder.service';
import { HttpClient } from '@angular/common/http';

// history attributes

// history_id:2,
// end_date:"2019-04-05 14:19:00.0",
// note_content:"gfdgdhdhfhfjfjfjhkfffjffjfjfjf",
// total_discount:0.88,
// history_name:"trouble",
// history_content:"dsfdsafdsfsdfdsfsdafsafds",
// process_state_id:"2",
// customer_id:3,
// start_date:"2019-03-15 14:19:00.0"

export class HistoryItem {

    private title: string;
    private id: string;
    private content: string;
    private processState: Status;
    private note: string;
    private customerId: any;
    private start_Date: string;
    private end_Date: string;
    private discount: any;


    private httpWorker: HttpWorkerService;

    constructor(param, private http: HttpClient) {
        this.title = param.history_name;
        this.id = param.history_id;
        this.content = param.history_content;
        this.processState = param.process_state_id;
        this.note = param.note_content;
        this.customerId = param.customer_id;
        this.start_Date = new Date().toISOString() || param.start_date;
        this.end_Date = new Date().toISOString() || param.end_date;
        this.discount = param.total_discount;
    }

    getTitle() { return this.title; }

    setTitle(param: string) { this.title = param; }

    getHistoryId() { return this.id; }

    setHistoryId(param: string) { this.id = param; }

    getContent() { return this.content; }

    setContent(param: string) { this.content = param; }

    getStatus() { return this.processState; }

    setStatus(param: Status) { this.processState = param; }

    getNote() { return this.note; }

    setNote(param: string) { this.note = param; }

    getCustomerId() { return this.customerId; }

    setCustomerId(param: any) { this.customerId = param; }

    getStartDate() { return this.start_Date; }

    setStartDate(param: Date) { this.start_Date = param.toISOString(); }

    getEndDate() { return this.end_Date; }

    setEndDate(param: Date) { this.end_Date = param.toISOString(); }

    getDiscount() { return this.discount; }

    setDiscount(param: any) { this.discount = param; }

    // setHistory(param: any) {
    //     this.title = param.history_name;
    //     this.id = param.history_id;
    //     this.content = param.history_content;
    //     this.processState = param.process_state_id;
    //     this.note = param.note_content;
    //     this.customerId = param.customer_id;
    //     this.start_Date = new Date().toISOString() || param.start_date;
    //     this.end_Date = new Date().toISOString() || param.end_date;
    //     this.discount = param.total_discount;
    // }

    // quotToHistory(param: any) {
    //     this.title = param.history_name;
    //     this.id = param.history_id;
    //     this.content = param.history_content;
    //     this.processState = param.process_state_id;
    //     this.note = param.note_content;
    //     this.customerId = param.customer_id;
    //     this.start_Date = new Date().toISOString();
    //     this.end_Date = new Date().toISOString();
    //     this.discount = param.total_discount;
    // }

    insert(param: HistoryItem) {
        let body = {
            history_id: param.id,
            end_date: param.end_Date,
            note_content: param.note,
            total_discount: param.discount,
            history_name: param.title,
            history_content: param.content,
            process_state_id: param.processState,
            customer_id: param.customerId,
            start_date: param.start_Date
        }
    }

    update(param: HistoryItem, uuid: string) {
        let updateHistoryUrl = 'https://jsv0xkq3wc.execute-api.ap-southeast-2.amazonaws.com/dev/updatehistory';
        let body = {
            historyName: param.title,
            historyContent: param.content,
            processStateId: param.processState,
            startDate: param.start_Date,
            endDate: param.end_Date,
            customerId: param.customerId,
            noteContent: param.note,
            userId: uuid,
            historyId: param.id,
            totalDiscount: param.discount
        };
        this.httpWorker = new HttpWorkerService(this.http, updateHistoryUrl, body);
        this.httpWorker.httpPost().subscribe(
            res => {
                console.log(res);
            }
        );
    }

    cancel(param: string) {
        let url = 'https://nx0zekxsae.execute-api.ap-southeast-2.amazonaws.com/dev/losthistory';
        let body = { historyId: param };
        this.httpWorker = new HttpWorkerService(this.http, url, body);
        this.httpWorker.httpPost().subscribe(res => {
            if (res) {
                console.log(res);
            }
        });
    }
}

export class HistoryList {
    // public properties
    userId: string;
    historys: Array<HistoryItem>;
    // constructor
    constructor(params) {
        this.userId = params.userId;
        this.historys = params.historys || [];
    }
}
