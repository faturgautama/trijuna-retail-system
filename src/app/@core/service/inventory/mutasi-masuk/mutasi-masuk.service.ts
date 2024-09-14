import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { MutasiLokasiModel } from 'src/app/@shared/models/inventory/mutasi-lokasi.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class MutasiMasukService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi_masuk/by_param`, { filter: filter });
    }

    getById(id_mutasi_lokasi: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/mutasi_lokasi_masuk/by_id/${id_mutasi_lokasi}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi_masuk/upload`, payload);
    }

    validasi(payload: MutasiLokasiModel.ValidasiMutasiLokasi): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi_masuk/validasi`, payload);
    }
}
