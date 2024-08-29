import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SetupUserGroupService {

    // constructor(
    //     private _httpRequestService: HttpRequestService,
    // ) { }

    // getAllDivisi(): Observable<any> {
    //     return this._httpRequestService.getRequest(`${environment.endpoint}/divisi/all`);
    // }

    // getById(id_divisi: number): Observable<any> {
    //     return this._httpRequestService.getRequest(`${environment.endpoint}/divisi/${id_divisi}`);
    // }

    // saveDivisi(payload: SetupDivisiModel.SaveSetupDivisi): Observable<any> {
    //     return this._httpRequestService.postRequest(`${environment.endpoint}/divisi`, payload);
    // }

    // updateDivisi(payload: SetupDivisiModel.UpdateSetupDivisi): Observable<any> {
    //     return this._httpRequestService.putRequest(`${environment.endpoint}/divisi/${payload.id_divisi}`, payload);
    // }

    // deleteDivisi(id_divisi: number): Observable<any> {
    //     return this._httpRequestService.deleteRequest(`${environment.endpoint}/divisi/${id_divisi}`);
    // }
}
