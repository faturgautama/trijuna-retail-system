import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupKaryawanService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/hr_karyawan`);
    }

    getById(id_karyawan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/hr_karyawan/${id_karyawan}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/hr_karyawan`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/hr_karyawan/${payload.id_karyawan}`, payload);
    }

    delete(id_karyawan: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/hr_karyawan/${id_karyawan}`);
    }
}
