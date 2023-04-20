import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupMerkModel } from 'src/app/@shared/models/setup-data/setup-merk.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupMerkService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllMerk(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/merk/all`);
    }

    getById(id_merk: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/merk/${id_merk}`);
    }

    saveMerk(payload: SetupMerkModel.SaveSetupMerk): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/merk`, payload);
    }

    updateMerk(payload: SetupMerkModel.UpdateSetupMerk): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/merk/${payload.id_merk}`, payload);
    }

    deleteMerk(id_merk: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/merk/${id_merk}`);
    }
}
