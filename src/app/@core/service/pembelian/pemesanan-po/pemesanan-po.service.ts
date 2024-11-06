import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PemesananPoModel } from 'src/app/@shared/models/pembelian/pemesanan-po.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PemesananPoService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pembelian/get_by_param`, { filter: filter });
    }

    getCountStatusOpen(): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pembelian/get_by_param`, { filter: [] })
            .pipe(
                map((result) => {
                    let data = 0;

                    result.data.forEach((item: any) => {
                        if (item.status_pemesanan == 'OPEN') {
                            data += 1;
                        }
                    });

                    return data;
                })
            );
    }

    getById(id_pemesanan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/pembelian/get_by_id/${id_pemesanan}`);
    }

    save(payload: PemesananPoModel.SavePemesananPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pembelian/insert`, payload);
    }

    edit(payload: PemesananPoModel.EditPemesananPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/pembelian/edit`, payload);
    }
}
