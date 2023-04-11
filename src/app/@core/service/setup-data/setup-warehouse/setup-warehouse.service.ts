import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupWarehouseModel } from 'src/app/@shared/models/setup-data/setup-warehouse.model';
import { HttpRequestService } from 'src/app/@shared/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupWarehouseService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllWarehouse(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/warehouse/all`);
    }

    getById(id_warehouse: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/warehouse/${id_warehouse}`);
    }

    saveWarehouse(payload: SetupWarehouseModel.SaveSetupWarehouse): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/warehouse`, payload);
    }

    updateWarehouse(payload: SetupWarehouseModel.UpdateSetupWarehouse): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/warehouse/${payload.id_warehouse}`, payload);
    }

    deleteWarehouse(id_warehouse: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/warehouse/${id_warehouse}`);
    }
}
