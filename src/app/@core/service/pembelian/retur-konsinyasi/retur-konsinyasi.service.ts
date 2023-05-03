import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { ReturKonsinyasiModel } from 'src/app/@shared/models/pembelian/retur-konsinyasi.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class ReturKonsinyasiService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/retur_konsinyasi/get_by_param`, { filter: filter });
    }

    getById(id_retur_pembelian: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/retur_konsinyasi/get_by_id/${id_retur_pembelian}`);
    }

    save(payload: ReturKonsinyasiModel.SaveReturKonsinyasi): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/retur_konsinyasi/insert`, payload);
    }

    validasi(id_retur_pembelian: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/retur_konsinyasi/validasi`, { id_retur_pembelian: id_retur_pembelian });
    }
}
