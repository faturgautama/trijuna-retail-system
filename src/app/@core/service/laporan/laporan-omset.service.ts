import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class LaporanOmsetService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getLaporanOmsetBreakdownMonthly(year: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_omzet/breakdown_monthly/${year}`);
    }

    getLaporanOmsetBreakdownDaily(date: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_omzet/breakdown_daily/${date}`,);
    }

    getLaporanOmsetProfitBreakdownMonthly(year: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_profit/breakdown_monthly/${year}`,);
    }

    getLaporanOmsetProfitBreakdownDaily(date: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_profit/breakdown_daily/${date}`,);
    }
}
