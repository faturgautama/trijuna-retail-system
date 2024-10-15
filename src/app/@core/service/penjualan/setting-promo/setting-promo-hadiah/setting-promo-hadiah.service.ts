import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SettingPromoHadiahService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_hadiah`);
    }

    getById(id_promo_hadiah: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_promo_hadiah_detail/${id_promo_hadiah}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/ms_promo_hadiah`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/ms_promo_hadiah/${payload.id_promo_hadiah}`, payload);
    }

    delete(id_promo_hadiah: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/ms_promo_hadiah/${id_promo_hadiah}`);
    }
}
