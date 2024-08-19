import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { MutasiLokasiModel } from 'src/app/@shared/models/inventory/mutasi-lokasi.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class MutasiLokasiService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi/get_by_param`, { filter: filter });
    }

    getCountStatusOpen(): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi/get_by_param`, { filter: [] })
            .pipe(
                map((result) => {
                    let data = 0;

                    result.data.forEach((item: any) => {
                        if (item.status_mutasi_lokasi == 'OPEN') {
                            data += 1;
                        }
                    });

                    return data;
                })
            );
    }

    getById(id_mutasi_lokasi: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/mutasi_lokasi/get_by_id/${id_mutasi_lokasi}`);
    }

    save(payload: MutasiLokasiModel.SaveMutasiLokasi): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi/insert`, payload);
    }

    validasi(payload: MutasiLokasiModel.ValidasiMutasiLokasi): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/mutasi_lokasi/validasi`, payload);
    }
}
