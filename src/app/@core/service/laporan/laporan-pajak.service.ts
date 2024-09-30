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

    getLaporanPajakBkp(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pajak/bkp/get_by_param`, { filter: filter });
    }

    getLaporanPajakNonBkp(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pajak/non-bkp/get_by_param`, { filter: filter });
    }

    getLaporanPajakBkpRekap(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pajak/bkp_rekap/get_by_param`, { filter: filter });
    }
}
