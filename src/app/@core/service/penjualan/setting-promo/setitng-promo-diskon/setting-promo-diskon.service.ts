import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SettingPromoDiskonService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_diskon`);
    }

    getById(id_promo_diskon: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_diskon_detail/${id_promo_diskon}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/ms_promo_diskon`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/ms_promo_diskon/${payload.id_promo_diskon}`, payload);
    }

    delete(id_promo_diskon: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/ms_promo_diskon/${id_promo_diskon}`);
    }
}
