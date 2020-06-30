import { HttpHeaders, HttpClient } from '@angular/common/http';

// http service provider
// handle http post and return response
export class HttpWorkerService {
    httpOptions: any; // http header
    url: string; // endpoint url
    response: any; // http response
    http: HttpClient; // http client
    body: any; // http body

    // construction
    constructor(
        http: HttpClient,
        url: string,
        body: any) {
        this.http = http;
        this.url = url;
        this.body = body;

        // set http header
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    httpPost() {
        return this.http.post(this.url, JSON.stringify(this.body), this.httpOptions);
    }
}
