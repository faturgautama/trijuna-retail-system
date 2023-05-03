import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PembelianTanpaPoModel } from 'src/app/@shared/models/pembelian/pembelian-tanpa-po.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';
import { PenerimaanKonsinyasiModel } from 'src/app/@shared/models/pembelian/penerimaan-konsinyasi.model';

@Injectable({
    providedIn: 'root'
})
export class PenerimaanKonsinyasiService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_konsinyasi/get_by_param`, { filter: filter });
    }

    getById(id_penerimaan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/penerimaan_konsinyasi/get_by_id/${id_penerimaan}`);
    }

    save(payload: PenerimaanKonsinyasiModel.SavePenerimaanKonsinyasi): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_konsinyasi/insert`, payload);
    }

    validasi(id_penerimaan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_konsinyasi/validasi`, { id_penerimaan: id_penerimaan });
    }
}
