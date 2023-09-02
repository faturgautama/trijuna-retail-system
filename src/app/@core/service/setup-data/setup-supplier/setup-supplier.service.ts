import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { SetupSupplierModel } from 'src/app/@shared/models/setup-data/setup-supplier.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';
import { supplier } from 'src/app/@core/data/data';

@Injectable({
    providedIn: 'root'
})
export class SetupSupplierService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllSupplier(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/supplier/by_param`, { filter: filter });

        // return of({ success: true, message: '', data: supplier });
    }

    getByIdSupplier(id_supplier: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/supplier/${id_supplier}`);

        // const data = supplier.filter((item) => { return item.id_supplier == id_supplier });
        // return of({ success: true, message: '', data: data });
    }

    saveSupplier(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/supplier`, payload);
    }

    updateSupplier(payload: SetupSupplierModel.UpdateSupplier): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/supplier/${payload.id_supplier}`, payload);
    }

    deleteSupplier(id_supplier: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/supplier/${id_supplier}`);
    }
}
