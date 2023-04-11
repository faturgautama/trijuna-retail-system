import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { LoginModel } from '../../models/authentication/authentication.model';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';
import { API } from '../../api';
import { CookiesUtils } from '../../utils/cookies.utils';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private _router: Router,
        private _cookieUtils: CookiesUtils,
        private _httpRequestService: HttpRequestService,
    ) { }

    login(payload: LoginModel.ILogin): Observable<LoginModel.Login> {
        return this._httpRequestService.postRequest(API.AUTHENTICATION.LOGIN, payload)
            .pipe(
                map((result) => {
                    if (result.success) {
                        this.handlingAuth(result.data);
                        return result;
                    }
                })
            )
    }

    private handlingAuth(data: LoginModel.ILoginResponse): void {
        this._cookieUtils.setCookie("TRSUserData", data);
    }
}
