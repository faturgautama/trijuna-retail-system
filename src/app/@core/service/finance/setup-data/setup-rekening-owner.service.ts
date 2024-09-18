import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupRekeningOwnerService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_rekening_owner`);
    }

    getById(id_rekening: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_rekening_owner/${id_rekening}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/ms_rekening_owner`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/ms_rekening_owner/${payload.id_rekening}`, payload);
    }
}
