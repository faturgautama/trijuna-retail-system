import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupRakModel } from 'src/app/@shared/models/setup-data/setup-rak.model';
import { HttpRequestService } from 'src/app/@shared/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupRakService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllRak(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/rak/all`);
    }

    getById(id_rak: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/rak/${id_rak}`);
    }

    saveRak(payload: SetupRakModel.SaveSetupRak): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/rak`, payload);
    }

    updateRak(payload: SetupRakModel.UpdateSetupRak): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/rak/${payload.id_rak}`, payload);
    }

    deleteRak(id_rak: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/rak/${id_rak}`);
    }
}
