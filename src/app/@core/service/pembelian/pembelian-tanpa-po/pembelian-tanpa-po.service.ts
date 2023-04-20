import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PembelianTanpaPoModel } from 'src/app/@shared/models/pembelian/pembelian-tanpa-po.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PembelianTanpaPoService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/get_by_param`, { filter: filter });
    }

    getById(id_pembelian: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/penerimaan_tanpa_po/get_by_id/${id_pembelian}`);
    }

    save(payload: PembelianTanpaPoModel.SavePembelianTanpaPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/insert`, payload);
    }

    validasi(id_penerimaan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/validasi`, { id_penerimaan: id_penerimaan });
    }
}
