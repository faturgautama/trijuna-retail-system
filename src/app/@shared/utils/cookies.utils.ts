import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class CookiesUtils {
    constructor(
        private _cookieService: CookieService,
    ) { }

    setCookie(key: string, data: any): void {
        this._cookieService.set(key, JSON.stringify(data));
    }

    getCookie(key: string): void {
        const check = this._cookieService.check(key);

        if (check) {
            const data = this._cookieService.get(key);
            return JSON.parse(data);
        }
    }

    deleteCookie(key: string): void {
        this._cookieService.delete(key);
    }

    deleteAllCookie(): void {
        this._cookieService.deleteAll();
    }
}