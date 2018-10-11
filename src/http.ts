import { Subject, Observable } from 'rxjs/Rx';
export class Http  {
    public response: any;
    private resp: Subject<any> = new Subject<any>();
    public error: any;
    public status: any;
    public success: boolean;

    public response$ = this.resp.asObservable();

    constructor() {

    }


    public make = async (opts: any): Promise<any> => {
        let that = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            that.response = null;
            that.error = null;
            that.status = "executing";
            xhr.open(opts.method, opts.url, true);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    that.response = xhr.response;
                    that.resp.next(that.response);
                    that.status = "complete";
                    that.success = true;
                    resolve(xhr.response);
                } else {
                    that.error = {
                        status: this.status,
                        statusText: xhr.statusText
                    };
                    that.status = "complete";
                    that.resp.next(that.error);
                    that.success = false;
                    reject(that.error);

                }
            };
            xhr.onerror = function () {
                that.error = {
                    status: this.status,
                    statusText: xhr.statusText
                };
                that.status = "complete";
                that.resp.next(that.error);
                that.success = false;
                reject(that.error);

            };
            if (opts.headers) {
                Object.keys(opts.headers).forEach(function (key) {
                    xhr.setRequestHeader(key, opts.headers[key]);
                });
            }
            var params = opts.data;
            // We'll need to stringify if we've been given an object
            // If we have a string, this is skipped.
            if (params && typeof params === 'object') {
                params = Object.keys(params).map(function (key) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                }).join('&');
            }
            xhr.send(params);
        });
    };
}