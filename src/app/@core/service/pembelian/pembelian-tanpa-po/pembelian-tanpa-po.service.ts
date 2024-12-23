import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PembelianTanpaPoModel } from 'src/app/@shared/models/pembelian/pembelian-tanpa-po.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PembelianTanpaPoService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/get_by_param`, { filter: filter });
    }

    getCountStatusOpen(): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/get_by_param`, { filter: [] })
            .pipe(
                map((result) => {
                    let data = 0;

                    result.data.forEach((item: any) => {
                        if (item.status_penerimaan == 'OPEN') {
                            data += 1;
                        }
                    });

                    return data;
                })
            );
    }

    getById(id_pembelian: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/penerimaan_tanpa_po/get_by_id/${id_pembelian}`);
    }

    save(payload: PembelianTanpaPoModel.SavePembelianTanpaPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/insert`, payload);
    }

    edit(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/edit`, payload);
    }

    validasi(id_penerimaan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/validasi`, { id_penerimaan: id_penerimaan });
    }

    cancel(id_penerimaan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_tanpa_po/cancel`, { id_penerimaan: id_penerimaan });
    }
}
