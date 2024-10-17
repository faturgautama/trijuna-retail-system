import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SettingStokOpnameService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/setting_stok_opname/get_by_param`, { filter: filter });
    }

    getById(id_setting_stok_opname: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/setting_stok_opname/get_by_id/${id_setting_stok_opname}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/setting_stok_opname/insert`, payload);
    }

    kalkulasi(id_setting_stok_opname: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/setting_stok_opname/kalkulasi/${id_setting_stok_opname}`);
    }

    finalisasi(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/setting_stok_opname/finalisasi`, payload);
    }
}
