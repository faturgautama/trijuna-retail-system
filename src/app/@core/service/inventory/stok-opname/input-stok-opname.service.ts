import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class InputStokOpnameService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/input_stok_opname/get_by_param`, { filter: filter });
    }

    getAllSettingStokOpname(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/input_stok_opname/get_setting_OS_by_param`, { filter: filter });
    }

    getBarangSettingStokOpname(id_setting_stok_opname: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/input_stok_opname/get_barang_by_setting_so/${id_setting_stok_opname}`);
    }

    getById(id_setting_stok_opname: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/input_stok_opname/by_id/${id_setting_stok_opname}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/input_stok_opname/insert`, payload);
    }
}
