import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PemesananPoService } from 'src/app/@core/service/pembelian/pemesanan-po/pemesanan-po.service';

@Component({
    selector: 'app-print-pemesanan-po',
    templateUrl: './print-pemesanan-po.component.html',
    styleUrls: ['./print-pemesanan-po.component.scss']
})
export class PrintPemesananPoComponent implements OnInit, AfterViewInit {

    Data: any;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _pemesananPoService: PemesananPoService,
    ) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }
}
