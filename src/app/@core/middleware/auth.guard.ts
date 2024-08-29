import { Router } from "@angular/router";
import { AuthenticationService } from "../service/authentication/authentication.service";
import { inject } from "@angular/core";

export const AuthGuard = () => {
    const authService = inject(AuthenticationService);

    const router = inject(Router);

    if (authService.userData) {
        return true;
    }

    return router.navigate(['']);
}