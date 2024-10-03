import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { SetupBarangModel } from 'src/app/@shared/models/setup-data/setup-barang.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupBarangService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllBarang(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/barang/by_param`, { filter: filter });
    }

    getByIdBarang(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/barang/by_id/${id_barang}`);
    }

    saveBarang(payload: SetupBarangModel.SaveSetupBarang): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/tambahbarang`, payload);
    }

    updateBarang(payload: SetupBarangModel.UpdateSetupBarang): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/updatebarang/${payload.id_barang}`, payload);
    }

    deleteBarang(id_barang: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/barang/${id_barang}`);
    }

    ubahStatusActiveBarang(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/barang/update_status_active/${id_barang}`);
    }

    getKartuStokBarang(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/barang/kartu_stok`, payload);
    }

    // ** Barang Satuan
    getAllBarangSatuan(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/barang_satuan/by_id_barang/${id_barang}`);
    }

    saveBarangSatuan(payload: SetupBarangModel.SaveSetupBarangSatuan): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/barang_satuan`, payload);
    }

    updateBarangSatuan(payload: SetupBarangModel.UpdateSetupBarangSatuan): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/barang_satuan/${payload.id_brang_satuan}`, payload);
    }

    deleteBarangSatuan(id_brang_satuan: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/barang_satuan/${id_brang_satuan}`);
    }

    // ** Barang Rak
    getAllBarangRak(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/barang_rak/by_id_barang/${id_barang}`);
    }

    saveBarangRak(payload: SetupBarangModel.SaveSetupBarangRak): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/barang_rak`, payload);
    }

    updateBarangRak(payload: SetupBarangModel.UpdateSetupBarangRak): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/barang_rak/${payload.id_barang_rak}`, payload);
    }

    deleteBarangRak(id_barang_rak: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/barang_rak/${id_barang_rak}`);
    }

    // ** Barang Komponen
    getAllBarangKomponen(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/barang_komponen/by_id_barang/${id_barang}`);
    }

    saveBarangKomponen(payload: SetupBarangModel.SaveSetupBarangKomponen): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/barang_komponen`, payload);
    }

    updateBarangKomponen(payload: SetupBarangModel.UpdateSetupBarangKomponen): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/barang_komponen/${payload.id_barang_komponen}`, payload);
    }

    deleteBarangKomponen(id_barang_komponen: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/barang_komponen/${id_barang_komponen}`);
    }

    // ** Barang Urai
    getAllBarangUrai(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/barang_urai/by_id_barang/${id_barang}`);
    }

    saveBarangUrai(payload: SetupBarangModel.SaveSetupBarangUrai): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/barang_urai`, payload);
    }

    updateBarangUrai(payload: SetupBarangModel.UpdateSetupBarangUrai): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/barang_urai/${payload.id_barang_urai}`, payload);
    }

    deleteBarangUrai(id_barang_urai: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/barang_urai/${id_barang_urai}`);
    }

    getOmsetBarang(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequestWithoutLoading(`${environment.endpoint}/barang/lihat_omzet/${id_barang}`);
    }

    getOmsetDanStokBarang(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequestWithoutLoading(`${environment.endpoint}/barang/lihat_stok_omzet/${id_barang}`);
    }

    getHistoryPenerimaan(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequestWithoutLoading(`${environment.endpoint}/barang/history_penerimaan/${id_barang}`);
    }

    getOmsetDanStokBarangCabang(id_barang: number): Observable<any> {
        return this._httpRequestService.getRequestWithoutLoading(`${environment.endpoint}/barang/lihat_stok_omzet_cabang/${id_barang}`);
    }
}
