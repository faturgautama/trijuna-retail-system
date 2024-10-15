import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SettingPromoHadiahSupplierService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(id_promo_hadiah: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_diskon_setting_supplier_by_id_promo_hadiah/${id_promo_hadiah}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/ms_promo_hadiah_setting_supplier`, payload);
    }

    delete(id_promo_hadiah_setting_supplier: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/ms_promo_diskon_setting_supplier_by_id_promo_hadiah/${id_promo_hadiah_setting_supplier}`);
    }
}
