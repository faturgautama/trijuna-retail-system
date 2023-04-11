import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupSatuanModel } from 'src/app/@shared/models/setup-data/setup-satuan.model';
import { HttpRequestService } from 'src/app/@shared/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupSatuanService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllSatuan(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/satuan/all`);
    }

    getById(id_satuan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/satuan/${id_satuan}`);
    }

    saveSatuan(payload: SetupSatuanModel.SaveSetupSatuan): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/satuan`, payload);
    }

    updateSatuan(payload: SetupSatuanModel.UpdateSetupSatuan): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/satuan/${payload.id_satuan}`, payload);
    }

    deleteSatuan(id_satuan: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/satuan/${id_satuan}`);
    }
}
