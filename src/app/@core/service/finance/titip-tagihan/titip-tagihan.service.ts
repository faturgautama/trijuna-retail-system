import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PemesananPoModel } from 'src/app/@shared/models/pembelian/pemesanan-po.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class TitipTagihanService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/bayar_hutang_supplier/get_by_param`, { filter: filter });
    }

    getById(id_bayar_hutang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/bayar_hutang_supplier/get_by_id/${id_bayar_hutang}`);
    }

    getAllNotaDanRetur(id_supplier: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/bayar_hutang_supplier/get_belum_lunas_by_id_supplier/${id_supplier}`);
    }

    save(payload: PemesananPoModel.SavePemesananPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/bayar_hutang_supplier/insert`, payload);
    }
}
