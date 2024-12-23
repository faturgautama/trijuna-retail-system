import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { MutasiWarehouseModel } from 'src/app/@shared/models/inventory/mutasi-warehouse.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';
import { HttpRequestBaseModel } from 'src/app/@shared/models/shared/http-request-base.model';

@Injectable({
    providedIn: 'root'
})
export class MutasiWarehouseService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_warehouse/get_by_param`, { filter: filter });
    }

    getCountStatusOpen(): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_warehouse/get_by_param`, { filter: [] })
            .pipe(
                map((result) => {
                    let data = 0;

                    result.data.forEach((item: any) => {
                        if (item.status_mutasi_warehouse == 'OPEN') {
                            data += 1;
                        }
                    });

                    return data;
                })
            );
    }

    getById(id_mutasi_warehouse: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/mutasi_warehouse/get_by_id/${id_mutasi_warehouse}`);
    }

    save(payload: MutasiWarehouseModel.SaveMutasiWarehouse): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_warehouse/insert`, payload);
    }

    validasi(payload: MutasiWarehouseModel.ValidasiMutasiWarehouse): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_warehouse/validasi`, payload);
    }

    cancel(id_mutasi_warehouse: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_warehouse/cancel`, { id_mutasi_warehouse: id_mutasi_warehouse });
    }
}
