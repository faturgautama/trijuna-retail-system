import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpRequestService } from '../../http-request/http-request.service';

@Injectable({
    providedIn: 'root'
})
export class SetupUserGroupService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAll(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/user_group/all`);
    }

    getById(id_user_group: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/user_group/${id_user_group}`);
    }

    save(payload: any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/user_group`, payload);
    }

    update(payload: any): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/user_group/${payload.id_user_group}`, payload);
    }

    delete(id_user_group: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/user_group/${id_user_group}`);
    }
}
