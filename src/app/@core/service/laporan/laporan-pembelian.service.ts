import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class LaporanPembelianService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getLaporanPembelianPpn(start: string, end: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_pembelian/ppn/${start}/${end}`);
    }

    getLaporanPembelianRokok(start: string, end: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_pembelian/rokok/${start}/${end}`,);
    }
}
