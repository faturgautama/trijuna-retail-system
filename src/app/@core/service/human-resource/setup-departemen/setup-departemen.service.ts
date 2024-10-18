import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupDepartemenService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/hr_departemen`);
    }

    getById(id_departemen: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/hr_departemen/${id_departemen}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/hr_departemen`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/hr_departemen/${payload.id_departemen}`, payload);
    }

    delete(id_departemen: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/hr_departemen/${id_departemen}`);
    }
}
