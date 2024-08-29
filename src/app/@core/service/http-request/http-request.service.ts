import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { HttpRequestBaseModel } from 'src/app/@shared/models/shared/http-request-base.model';
import { UtilityService } from '../utility/utility.service';

@Injectable({
    providedIn: 'root'
})
export class HttpRequestService {

    ToggleLoading = new BehaviorSubject(false);

    ErrorToast = new BehaviorSubject({ show: false, message: "" });

    constructor(
        private _httpClient: HttpClient,
        private _utilityService: UtilityService,
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

        for (const item in payload) {
            if (item.includes('tanggal') || item.includes('tgl') || item.includes('tangal')) {
                payload[item] = this._utilityService.FormatDate(payload[item], 'yyyy-MM-DD')
            }
        };

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

        for (const item in payload) {
            if (item.includes('tanggal') || item.includes('tgl')) {
                payload[item] = this._utilityService.FormatDate(payload[item], 'yyyy-MM-DD')
            }
        };

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
        this.ErrorToast.next({ show: true, message: error });
    }

    private handlingError(error: HttpErrorResponse): void {
        this.ToggleLoading.next(false);
        this.ErrorToast.next({ show: true, message: `${error.status} ${error.statusText}` });
    }
}
