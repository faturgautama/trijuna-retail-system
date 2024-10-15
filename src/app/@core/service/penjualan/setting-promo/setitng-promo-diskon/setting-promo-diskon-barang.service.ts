import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SettingPromoDiskonBarangService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(id_promo_diskon: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_diskon_setting_barang_by_id_promo_diskon/${id_promo_diskon}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/ms_promo_diskon_setting_barang`, payload);
    }

    delete(id_promo_diskon_setting_barang: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/ms_promo_diskon_setting_barang_by_id_promo_diskon/${id_promo_diskon_setting_barang}`);
    }
}
