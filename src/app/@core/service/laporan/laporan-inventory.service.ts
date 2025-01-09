import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class LaporanInventoryService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getLaporanKeluarMasukBarang(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/barang/keluar_masuk`, payload);
    }

    getLaporanStokPerTanggal(tanggal: string, payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/laporan_stok/capture/${tanggal}`, payload);
    }
}
