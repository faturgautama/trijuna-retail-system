import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { CroscekTutupKasirModel } from 'src/app/@shared/models/penjualan/croscek-tutup-kasir.model';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';
import { BukaKasirModel } from 'src/app/@shared/models/penjualan/buka-kasir.model';

@Injectable({
    providedIn: 'root'
})
export class ModalKasirService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllUserKasir(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/list/kasir`);
    }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/modal_kasir`);
    }

    getById(id_modal_kasir: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/modal_kasir/${id_modal_kasir}`);
    }

    insert(payload: BukaKasirModel.SaveBukaKasir): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/modal_kasir`, payload);
    }

    update(id_modal_kasir: number, payload: BukaKasirModel.UpdateBukaKasir): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/modal_kasir/${id_modal_kasir}`, payload);
    }

    delete(id_modal_kasir: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/modal_kasir/${id_modal_kasir}`);
    }
}
