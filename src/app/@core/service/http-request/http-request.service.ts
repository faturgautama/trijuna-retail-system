import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { HttpRequestBaseModel } from 'src/app/@shared/models/shared/http-request-base.model';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    ToggleLoading = new BehaviorSubject(false);

    ErrorToast = new BehaviorSubject({ show: false, message: "" });

    constructor(
        private _httpClient: HttpClient,
    ) { }

    getRequest(url: string): Observable<any> {
        this.ToggleLoading.next(true);

        return this._httpClient.get<HttpRequestBaseModel>(url)
            .pipe(
                map((result) => {
                    this.ToggleLoading.next(false);

                    if (result.success || result.status) {
                        return result;
                    } else {
                        this.handlingError200(result.message);
                        return result;
                    }
                }),
                catchError((error) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    postRequest(url: string, payload: any): Observable<any> {
        this.ToggleLoading.next(true);

        return this._httpClient.post<HttpRequestBaseModel>(url, payload)
            .pipe(
                map((result) => {
                    this.ToggleLoading.next(false);
                    if (result.success || result.status) {
                        return result;
                    } else {
                        this.handlingError200(result.message);
                        return result;
                    }
                }),
                catchError((error) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    putRequest(url: string, payload: any): Observable<any> {
        this.ToggleLoading.next(true);

        return this._httpClient.put<HttpRequestBaseModel>(url, payload)
            .pipe(
                map((result) => {
                    this.ToggleLoading.next(false);
                    if (result.success || result.status) {
                        return result;
                    } else {
                        this.handlingError200(result.message);
                        return result;
                    }
                }),
                catchError((error) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    deleteRequest(url: string): Observable<any> {
        this.ToggleLoading.next(true);

        return this._httpClient.delete<HttpRequestBaseModel>(url)
            .pipe(
                map((result) => {
                    this.ToggleLoading.next(false);
                    if (result.success || result.status) {
                        return result;
                    } else {
                        this.handlingError200(result.message);
                        return result;
                    }
                }),
                catchError((error) => {
                    this.handlingError(error);
                    throw error;
                })
            )
    }

    private handlingError200(error: string): void {
        console.warn(error);
        this.ErrorToast.next({ show: true, message: "Oops.. Something Went Wrong!" });
    }

    private handlingError(error: HttpErrorResponse): void {
        this.ToggleLoading.next(false);
        this.ErrorToast.next({ show: true, message: error.message });
    }
}