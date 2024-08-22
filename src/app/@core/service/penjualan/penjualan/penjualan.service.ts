import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class PenjualanService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penjualan/get_by_param`, { filter: filter });
    }

    getById(id_penjualan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/penjualan/get_by_id/${id_penjualan}`);
    }

    getAllSellOut(queryParams: string, filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penjualan/sell_out_item${queryParams}`, { filter: filter });
    }
}
