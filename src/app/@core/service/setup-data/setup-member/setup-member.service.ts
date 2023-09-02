import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, map, of } from 'rxjs';
import { FilterModel } from 'src/app/@shared/models/components/filter.model';
import { SetupMemberModel } from 'src/app/@shared/models/setup-data/setup-member.model';
import { HttpRequestService } from '../../http-request/http-request.service';
import { environment } from 'src/environments/environment';
import { member } from 'src/app/@core/data/data';

@Injectable({
    providedIn: 'root'
})
export class SetupMemberService {

    constructor(
        private _httpRequestService: HttpRequestService,
    ) { }

    getAllMember(filter: FilterModel.IDynamicFilter[]): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/member/by_param`, { filter: filter });
        // return of({ success: true, message: '', data: member });
    }

    getById(id_member: number): Observable<any> {
        return this._httpRequestService.getRequest(`${environment.endpoint}/member/by_param/${id_member}`);
    }

    saveMember(payload: SetupMemberModel.SaveMember | any): Observable<any> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/member`, payload);
        // payload['id_member'] = member.length + 1;
        // member.push(payload);
        // return of({ success: true, message: 'Data Berhasil Disimpan', data: "" })
    }

    updateMember(payload: SetupMemberModel.UpdateMember): Observable<any> {
        return this._httpRequestService.putRequest(`${environment.endpoint}/member/${payload.id_member}`, payload);
    }

    deleteMember(id_member: number): Observable<any> {
        return this._httpRequestService.deleteRequest(`${environment.endpoint}/member/${id_member}`);
    }
}
