import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PemesananPoModel } from 'src/app/@shared/models/pembelian/pemesanan-po.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class PelunasanHutangSupplierService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pelunasan_titip_tagihan/get_by_param`, { filter: filter });
    }

    getAllTitipTagihanBelumTerbayar(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pelunasan_titip_tagihan/get_tt_belum_terbayar`, { filter: filter });
    }

    getById(id_bayar_hutang_pelunasan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/pelunasan_titip_tagihan/get_by_id/${id_bayar_hutang_pelunasan}`);
    }

    save(payload: PemesananPoModel.SavePemesananPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pelunasan_titip_tagihan/insert`, payload);
    }
}
