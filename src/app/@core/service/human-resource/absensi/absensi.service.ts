import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class AbsensiService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(start: string, end: string, id_karyawan?: string): Observable<any> {
        const withKaryawan = this._httpRequestService.getRequest(`${environment.endpoint}/absen/${start}/${end}/${id_karyawan}`);
        const withoutKaryawan = this._httpRequestService.getRequest(`${environment.endpoint}/absen/${start}/${end}`);

        if (id_karyawan) {
            return withKaryawan;
        } else {
            return withoutKaryawan;
        }
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/absen`, payload);
    }
}
