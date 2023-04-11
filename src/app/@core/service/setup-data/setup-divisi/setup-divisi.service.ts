import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { SetupDivisiModel } from 'src/app/@shared/models/setup-data/setup-divisi.model';
import { HttpRequestService } from 'src/app/@shared/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupDivisiService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllDivisi(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/divisi/all`);
    }

    getById(id_divisi: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/divisi/${id_divisi}`);
    }

    saveDivisi(payload: SetupDivisiModel.SaveSetupDivisi): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/divisi`, payload);
    }

    updateDivisi(payload: SetupDivisiModel.UpdateSetupDivisi): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/divisi/${payload.id_divisi}`, payload);
    }

    deleteDivisi(id_divisi: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/divisi/${id_divisi}`);
    }
}
