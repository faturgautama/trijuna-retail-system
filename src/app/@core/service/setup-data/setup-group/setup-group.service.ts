import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetupGroupModel } from 'src/app/@shared/models/setup-data/setup-group.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SetupGroupService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllGroup(): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/group/all`);
    }

    getById(id_group: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/group/${id_group}`);
    }

    saveGroup(payload: SetupGroupModel.SaveSetupGroup): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/group`, payload);
    }

    updateGroup(payload: SetupGroupModel.UpdateSetupGroup): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/group/${payload.id_group}`, payload);
    }

    deleteGroup(id_group: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/group/${id_group}`);
    }
}
