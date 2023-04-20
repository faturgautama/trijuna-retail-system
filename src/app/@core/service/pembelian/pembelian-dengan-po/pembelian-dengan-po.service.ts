import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PembelianDenganPoModel } from 'src/app/@shared/models/pembelian/pembelian-dengan-po.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class PembelianDenganPoService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/get_by_param`, { filter: filter });
    }

    getById(id_pembelian: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/penerimaan_dengan_po/get_by_id/${id_pembelian}`);
    }

    getDetailPemesanan(id_pemesanan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/lookup_barang/${id_pemesanan}`, { filter: [] })
    }

    save(payload: PembelianDenganPoModel.SavePembelianDenganPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/insert`, payload);
    }

    validasi(id_penerimaan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/validasi`, { id_penerimaan: id_penerimaan });
    }
}
