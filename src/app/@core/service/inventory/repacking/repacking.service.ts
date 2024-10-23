import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class RepackingService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/repacking/get_by_param`, { filter: filter });
    }

    getById(id_repacking: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/repacking/get_by_id/${id_repacking}`);
    }

    getKomponenBarang(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/repacking/lookup_barang/${id_barang}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/repacking/insert`, payload);
    }

    validasi(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/repacking/validasi`, payload);
    }
}
