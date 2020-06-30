import { Item } from './item.class';

// quotation attributes

// customer_id: 3
// expiry_date: "2019-04-05 14:19:00.0"
// note_content: "gfdgdhdhfhfjfjfjhkfffjffjfjfjf"
// onsite_date: "2019-03-15 14:19:00.0"
// process_state_id: "2"
// quotation_content: "dsfdsafdsfsdfdsfsdafsafds"
// quotation_id: 1
// quotation_name: "fdsdf"
// total_discount: 0.75

export class QuotationItem extends Item {

    // constructor
    constructor(param) {
        super(
            param.quotation_id,
            param.quotation_name,
            param.quotation_content,
            param.process_state_id,
            param.note_content,
            param.customer_id,
            param.onsite_date,
            param.expiry_date,
            param.total_discount
        );
    }
}


export class QuotationList {
    // public properties
    userId: string;
    quotations: Array<QuotationItem>;
    // constructor
    constructor(params) {
        this.userId = params.userId;
        this.quotations = params.quotations || [];
    }
}
