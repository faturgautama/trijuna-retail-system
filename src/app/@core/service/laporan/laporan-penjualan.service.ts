import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class LaporanPenjualanService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getLaporanPenjualanGrosir(start: string, end: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_penjualan/grosir/${start}/${end}`);
    }

    getLaporanPenjualanEceran(start: string, end: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_penjualan/eceran/${start}/${end}`,);
    }

    getLaporanPenjualanRokok(start: string, end: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_penjualan/rokok/${start}/${end}`,);
    }

    getLaporanPenjualanSembako(start: string, end: string): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/laporan_penjualan/sembako/${start}/${end}`,);
    }
}
