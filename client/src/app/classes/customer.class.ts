import { HttpClient } from '@angular/common/http';
import { HttpWorkerService } from '../services/http-workder.service';


export class Customer {
    private customerFirstName: string;
    private customerLastName: string;
    private customerEmail: any;
    private customerPhoneNumber: any;
    private customerAddressStreet: string;
    private customerAddressSuburb: string;
    private customerAddressTowncity: string;
    private customerAddressState: string;
    private customerPostcode: string;
    private userId: any;

    private insertUrl: string;

    // Default Constructor
    constructor(private http: HttpClient) {
        this.customerFirstName = '';
        this.customerLastName = '';
        this.customerEmail = '';
        this.customerPhoneNumber = '';
        this.customerAddressStreet = '';
        this.customerAddressSuburb = '';
        this.customerAddressTowncity = '';
        this.customerAddressState = '';
        this.customerPostcode = '';
        this.userId = '';
    }

    getFirstName() { return this.customerFirstName; }

    setFirstName(param: string) { this.customerFirstName = param; }

    getLastName() { return this.customerLastName; }

    setLastName(param: string) { this.customerLastName = param; }

    getEmail() { return this.customerEmail; }

    setEmail(param: string) { this.customerEmail = param; }

    getPhone() { return this.customerPhoneNumber; }

    setPhone(param: string) { this.customerPhoneNumber = param; }

    getAddress() { return this.customerAddressStreet; }

    setAddress(param: string) { this.customerAddressStreet = param; }

    getSuburb() { return this.customerAddressSuburb; }

    setSuburb(param: string) { this.customerAddressSuburb = param; }

    getCity() { return this.customerAddressTowncity; }

    setCity(param: string) { this.customerAddressTowncity = param; }

    getState() { return this.customerAddressState; }

    setState(param: string) { this.customerAddressState = param; }

    getPostCode() { return this.customerPostcode; }

    setPostCode(param: string) { this.customerPostcode = param; }

    setUserID(param: string) { this.userId = param; }

    setCustomer(param: Customer) {
        this.customerFirstName = param.customerFirstName;
        this.customerLastName = param.customerLastName;
        this.customerEmail = param.customerEmail;
        this.customerPhoneNumber = param.customerPhoneNumber;
        this.customerAddressStreet = param.customerAddressStreet;
        this.customerAddressSuburb = param.customerAddressSuburb;
        this.customerAddressTowncity = param.customerAddressTowncity;
        this.customerAddressState = param.customerAddressState;
        this.customerPostcode = param.customerPostcode;
        this.userId = param.userId;
    }

    pushToBackend(param: Customer) {
        let body = {
            customerFirstName: param.customerFirstName,
            customerLastName: param.customerLastName,
            customerEmail: param.customerEmail,
            customerPhoneNumber: param.customerPhoneNumber,
            customerAddressStreet: param.customerAddressStreet,
            customerAddressSuburb: param.customerAddressSuburb,
            customerAddressTowncity: param.customerAddressTowncity,
            customerAddressState: param.customerAddressState,
            customerPostcode: param.customerPostcode,
            userId: param.userId
        }
        this.insertUrl = 'https://gfphha9q27.execute-api.ap-southeast-2.amazonaws.com/dev/insertcustomer';
        const httpWorker = new HttpWorkerService(this.http, this.insertUrl, body);
        httpWorker.httpPost().subscribe(
            res => {
                console.log(res);
            }
        );
    }
}
