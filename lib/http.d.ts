import { Observable } from 'rxjs/Rx';
export declare class Http {
    response: any;
    private resp;
    error: any;
    status: any;
    success: boolean;
    response$: Observable<any>;
    constructor();
    make: (opts: any) => Promise<any>;
}
