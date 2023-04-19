import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { LoginModel } from '../../models/authentication/authentication.model';
import { Observable, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { CookiesUtils } from '../../utils/cookies.utils';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(
        private _router: Router,
        private _cookieUtils: CookiesUtils,
        private _httpRequestService: HttpRequestService,
    ) { }

    get userData(): LoginModel.ILoginResponse {
        return this._cookieUtils.getCookie('TRSUserData') as any;
    }

    login(payload: LoginModel.ILogin): Observable<LoginModel.Login> {
        return this._httpRequestService.postRequest(`${environment.endpoint}/login`, payload)
            .pipe(
                map((result) => {
                    if (result.success) {
                        this.handlingAuth(result.data);
                        return result;
                    }
                })
            )
    }

    logout(): Promise<any> {
        this._httpRequestService.ToggleLoading.next(true);

        return new Promise((resolve) => {
            setTimeout(() => {
                this._httpRequestService.ToggleLoading.next(false);
                resolve("Sign Out Berhasil")
            }, 1000);
        });
    }

    checkOffline(): void {
        this._httpRequestService.getRequest('http://localhost:4000/test')
            .subscribe((result) => {
                console.log(result);
            })
    }

    private handlingAuth(data: LoginModel.ILoginResponse): void {
        this._cookieUtils.setCookie("TRSUserData", data);
    }
}
