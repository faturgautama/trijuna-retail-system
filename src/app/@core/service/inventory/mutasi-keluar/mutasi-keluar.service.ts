import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { MutasiLokasiModel } from 'src/app/@shared/models/inventory/mutasi-lokasi.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class MutasiKeluarService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi_keluar/by_param`, { filter: filter });
    }

    getById(id_mutasi_lokasi: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/mutasi_lokasi_keluar/by_id/${id_mutasi_lokasi}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi_keluar/insert`, payload);
    }

    validasi(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi_keluar/validasi`, payload);
    }

    downloadFile(id: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/mutasi_lokasi_keluar/download/${id}`);
    }
}
