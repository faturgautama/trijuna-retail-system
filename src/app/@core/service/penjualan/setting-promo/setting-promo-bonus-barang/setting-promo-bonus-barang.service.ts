import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SettingPromoBonusBarangService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_bonus`);
    }

    getById(id_promo_bonus: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_bonus/${id_promo_bonus}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/ms_promo_bonus`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/ms_promo_bonus/${payload.id_promo_bonus}`, payload);
    }

    delete(id_promo_bonus: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/ms_promo_bonus/${id_promo_bonus}`);
    }
}
