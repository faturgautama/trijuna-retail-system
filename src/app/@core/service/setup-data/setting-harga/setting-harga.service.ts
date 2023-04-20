import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { SettingHargaModel } from 'src/app/@shared/models/setup-data/setting-harga.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingHargaService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/setting_harga/by_param`, { filter: filter });
    }

    getById(id_setting_harga: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/setting_harga/${id_setting_harga}`);
    }

    save(payload: SettingHargaModel.SaveSettingHarga): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/setting_harga`, payload);
    }
}
