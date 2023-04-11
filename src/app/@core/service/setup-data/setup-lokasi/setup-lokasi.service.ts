import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupGroupModel } from 'src/app/@shared/models/setup-data/setup-group.model';
import { SetupLokasiModel } from 'src/app/@shared/models/setup-data/setup-lokasi.model';
import { HttpRequestService } from 'src/app/@shared/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupLokasiService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllLokasi(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/lokasi/all`);
    }

    getById(id_lokasi: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/lokasi/${id_lokasi}`);
    }

    saveLokasi(payload: SetupLokasiModel.SaveSetupLokasi): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/lokasi`, payload);
    }

    updateLokasi(payload: SetupLokasiModel.UpdateSetupLokasi): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/lokasi/${payload.id_lokasi}`, payload);
    }

    deleteLokasi(id_lokasi: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/lokasi/${id_lokasi}`);
    }
}
