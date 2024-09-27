import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PemesananPoModel } from 'src/app/@shared/models/pembelian/pemesanan-po.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class FakturPajakPembelianService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/faktur_pajak/get_by_param`, { filter: filter });
    }

    getAllPembelianBelumInputFakturPajak(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/faktur_pajak/get_penerimaan_belum_faktur_pajak_by_pharam`, { filter: filter });
    }

    getById(id_bayar_hutang_pelunasan: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/faktur_pajak/get_by_id/${id_bayar_hutang_pelunasan}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/faktur_pajak/insert`, payload);
    }
}
