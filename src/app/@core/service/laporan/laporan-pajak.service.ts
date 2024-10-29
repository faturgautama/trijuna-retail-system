import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class LaporanPajakService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getLaporanPajakBkp(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/laporan/bkp`, payload);
    }

    getLaporanPajakNonBkp(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/laporan/non_bkp`, payload);
    }

    getLaporanPajakBkpRekap(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/laporan/rekap_bkp`, payload);
    }
}
