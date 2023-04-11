import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { SetupSupplierModel } from 'src/app/@shared/models/setup-data/setup-supplier.model';
import { HttpRequestService } from 'src/app/@shared/services/http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupSupplierService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllSupplier(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/supplier/by_param`, { filter: filter });
    }

    getByIdSupplier(id_supplier: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/supplier/${id_supplier}`);
    }

    saveSupplier(payload: SetupSupplierModel.SaveSupplier): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/supplier`, payload);
    }

    updateSupplier(payload: SetupSupplierModel.UpdateSupplier): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/supplier/${payload.id_supplier}`, payload);
    }

    deleteSupplier(id_supplier: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/supplier/${id_supplier}`);
    }
}
