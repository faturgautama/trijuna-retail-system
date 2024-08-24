import { Injectable } from '@angular/core';
import { HttpRequestService } from '../../http-request/http-request.service';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CroscekTutupKasirModel } from 'src/app/@shared/models/penjualan/croscek-tutup-kasir.model';

@Injectable({
    providedIn: 'root'
})
export class CroscekTutupKasirService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/kroscek_tutup_kasir/get_by_param`, { filter: filter });
    }

    getById(id_penjualan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/kroscek_tutup_kasir/get_by_id/${id_penjualan}`);
    }

    getAllBelumCroscek(): Observable<CroscekTutupKasirModel.GetTutupKasirBelumCroscek> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/kroscek_tutup_kasir/tutup_kasir_belum_croscek`);
    }

    getDetailBelumCroscek(id_tutup_kasir: number): Observable<CroscekTutupKasirModel.GetDetailTutupKasirBelumCroscek> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/kasir/detail_tutup_kasir/${id_tutup_kasir}`);
    }

    validasi(payload: CroscekTutupKasirModel.ValidasiCroscekTutupKasir): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/kroscek_tutup_kasir/validasi`, payload);
    }
}
