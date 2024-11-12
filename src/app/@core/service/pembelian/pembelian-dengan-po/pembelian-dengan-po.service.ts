import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { PembelianDenganPoModel } from 'src/app/@shared/models/pembelian/pembelian-dengan-po.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class PembelianDenganPoService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/get_by_param`, { filter: filter });
    }

    getCountStatusOpen(): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/get_by_param`, { filter: [] })
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
        return this._httpRequestService.getRequest(`${environment.endpoint}/penerimaan_dengan_po/get_by_id/${id_pembelian}`);
    }

    getDetailPemesanan(id_pemesanan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/lookup_barang/${id_pemesanan}`, { filter: [] })
            .pipe(
                map((result) => {
                    if (result.status) {
                        result.data = result.data.filter((item: any) => {
                            item.biaya_barcode = 0;
                            item.nama_bonus = "";

                            return item;
                        });

                        return result;
                    } else {
                        return result;
                    }
                })
            )
    }

    save(payload: PembelianDenganPoModel.SavePembelianDenganPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/insert`, payload);
    }

    edit(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/edit`, payload);
    }

    validasi(payload: PembelianDenganPoModel.ValidasiPembelianDenganPo): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/validasi`, payload);
    }

    cancel(id_penerimaan: number): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/penerimaan_dengan_po/cancel`, { id_penerimaan: id_penerimaan });
    }
}