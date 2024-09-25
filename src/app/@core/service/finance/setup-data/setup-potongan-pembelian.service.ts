import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupPotonganPembelianService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_potongan_pembelian`)
            .pipe(
                map((result) => {
                    return result.success ? result.data.data : [];
                })
            )
    }

    getById(id_potongan_pembelian: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/ms_potongan_pembelian/${id_potongan_pembelian}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/ms_potongan_pembelian`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/ms_potongan_pembelian/${payload.id_potongan_pembelian}`, payload);
    }
}
