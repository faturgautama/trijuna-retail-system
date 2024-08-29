import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../service/authentication/authentication.service";


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private _authenticationService: AuthenticationService,
    ) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const WebApiUrl = httpRequest.url.startsWith(`${environment.endpoint}`);

        const IsUserLogin = this._authenticationService.userData;

        if (IsUserLogin && WebApiUrl) {
            const UserData = IsUserLogin;

            const modifiedRequest = httpRequest.clone({
                setHeaders: {
                    Authorization: `Bearer ${UserData.token}`
                }
            });
            return next.handle(modifiedRequest);
        } else {
            return next.handle(httpRequest);
        }
    }
}
