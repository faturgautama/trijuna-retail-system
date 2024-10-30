import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class AssemblyService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/produksi/get_by_param`, { filter: filter });
    }

    getById(id_repacking: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/produksi/get_by_id/${id_repacking}`);
    }

    getKomponenBarang(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/produksi/lookup_barang/${id_barang}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/produksi/insert`, payload);
    }

    validasi(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/produksi/validasi`, { id_repacking: payload });
    }
}
