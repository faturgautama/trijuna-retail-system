import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {

    @Input('props') props: string[] = [];

    constructor(
        private _router: Router,
    ) { }

    handleBackToHome(): void {
        this._router.navigate(['beranda']);
    }
}
