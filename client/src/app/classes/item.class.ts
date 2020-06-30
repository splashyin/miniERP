import { Status } from './Status.enum';

export abstract class Item {
    id: any;
    title: string;
    description: string;
    status: Status;
    note: string;
    customerId: any;
    start_date: string;
    end_date: string;
    discount: any;

    constructor(
        id: any,
        title: string,
        description: string,
        status: Status,
        note: string,
        customerId: any,
        start_date: string,
        end_date: string,
        discount: any
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.note = note;
        this.customerId = customerId;
        this.start_date = start_date;
        this.end_date = end_date;
        this.discount = discount;
    }
}
