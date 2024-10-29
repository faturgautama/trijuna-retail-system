import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SettingPointMemberService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/member/point`);
    }

    getById(id_setting_point: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/member/point/${id_setting_point}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/member/point`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/member/point/${payload.id_setting_point}`, payload);
    }

    delete(id_setting_point: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/member/point/${id_setting_point}`);
    }
}
